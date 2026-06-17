/**
 * Minimal Google Sheets reader using the public gviz endpoint (no API key).
 *
 * The target sheet must be shared "Anyone with the link: Viewer". Each tab is
 * read as an array of row objects keyed by the header row's column labels, e.g.
 * `{ id: 'x', title_en: '…', title_my: '…' }`. The FIRST row of every tab must
 * be the header row matching the schema the parsers expect.
 *
 * gviz JSON (rather than CSV) is used on purpose: cell values keep their literal
 * newlines, which matters for multi-paragraph article bodies.
 */

// The Google Sheet holding future webinar/article additions. Replace the
// placeholder with the real sheet id (the long token in the sheet's URL:
// docs.google.com/spreadsheets/d/<SHEET_ID>/edit) and share it
// "Anyone with the link: Viewer". Until then the app silently uses bundled data.
export const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';

const FETCH_TIMEOUT_MS = 12000;

/** False while `SHEET_ID` is still the placeholder, so callers can skip the network. */
export function isSheetConfigured(): boolean {
  return !!SHEET_ID && !SHEET_ID.startsWith('YOUR_');
}

function gvizUrl(tab: string): string {
  // headers=1 forces gviz to treat row 1 as column labels regardless of types.
  return (
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
    `?tqx=out:json&headers=1&sheet=${encodeURIComponent(tab)}`
  );
}

type GvizCol = { label?: string; id?: string };
// `v` is the raw value; `f` is Google's formatted display string (present for
// e.g. date/number cells — preferred so a date column yields "Apr 2026", not
// the raw "Date(2026,3,1)").
type GvizCell = { v: unknown; f?: string } | null;
type GvizRow = { c: GvizCell[] };
type GvizTable = { cols: GvizCol[]; rows: GvizRow[] };

/** Unwrap the `…google.visualization.Query.setResponse({...});` envelope. */
function parseGviz(body: string): GvizTable | null {
  const start = body.indexOf('(');
  const end = body.lastIndexOf(')');
  if (start < 0 || end <= start) return null;
  try {
    const json = JSON.parse(body.slice(start + 1, end)) as { table?: GvizTable };
    return json.table ?? null;
  } catch {
    return null;
  }
}

function rowsToObjects(table: GvizTable): Record<string, string>[] {
  const headers = (table.cols ?? []).map((c, i) => (c.label || c.id || `col${i}`).trim());
  return (table.rows ?? [])
    .filter((r) => r && Array.isArray(r.c))
    .map((r) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        const cell = r.c[i];
        if (!cell) {
          obj[h] = '';
          return;
        }
        if (typeof cell.f === 'string') {
          obj[h] = cell.f; // Google's formatted display value
        } else {
          obj[h] = cell.v != null ? (typeof cell.v === 'string' ? cell.v : String(cell.v)) : '';
        }
      });
      return obj;
    });
}

/** Fetch one sheet tab as row objects. Throws on network/parse failure. */
export async function fetchSheetTab(tab: string): Promise<Record<string, string>[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(gvizUrl(tab), { signal: controller.signal });
    if (!res.ok) throw new Error(`Sheet "${tab}" responded ${res.status}`);
    const body = await res.text();
    const table = parseGviz(body);
    if (!table) throw new Error(`Sheet "${tab}" returned an unparseable response`);
    return rowsToObjects(table);
  } finally {
    clearTimeout(timer);
  }
}

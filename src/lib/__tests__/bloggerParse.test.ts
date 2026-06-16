import {
  cleanTitle,
  entryId,
  formatDate,
  mapCategory,
  parseEntry,
  parseFeed,
  stripEmoji,
  type FeedEntry,
} from '../bloggerParse';

describe('stripEmoji', () => {
  it('removes pictographs and flag emojis', () => {
    expect(stripEmoji('Hello 🎓 World 🇩🇪')).toBe('Hello  World ');
  });

  it('removes ZWJ-joined emoji sequences entirely', () => {
    expect(stripEmoji('family 👨‍👩‍👧 here')).toBe('family  here');
  });

  it('leaves Burmese text (including a ligature ZWJ) intact', () => {
    // A bare ZWJ between two Burmese consonants must be preserved — it is used
    // for ligature shaping, not for gluing emoji together.
    const burmese = 'က‍ခ';
    expect(stripEmoji(`မြန်မာ ${burmese}`)).toBe(`မြန်မာ ${burmese}`);
  });
});

describe('cleanTitle', () => {
  it('strips emojis and collapses the whitespace they leave behind', () => {
    expect(cleanTitle('🎓 Germany   Scholarships 📌')).toBe('Germany Scholarships');
  });
});

describe('mapCategory', () => {
  it('prefers UK over everything', () => {
    expect(mapCategory(['UK', 'Scholarships'])).toBe('UK');
  });

  it('maps an "About …" label to About', () => {
    expect(mapCategory(['About ချိတ်'])).toBe('About');
  });

  it('collapses country + Scholarships to Scholarships', () => {
    expect(mapCategory(['Germany', 'Scholarships'])).toBe('Scholarships');
  });

  it('maps "Testing & Curriculum" to Testing', () => {
    expect(mapCategory(['Testing & Curriculum'])).toBe('Testing');
  });

  it('defaults unknown labels to US', () => {
    expect(mapCategory(['Germany'])).toBe('US');
    expect(mapCategory([])).toBe('US');
  });
});

describe('formatDate', () => {
  it('formats a valid ISO date as "Mon YYYY"', () => {
    expect(formatDate('2026-04-15T00:00:00.000Z')).toBe('Apr 2026');
  });

  it('returns an empty string for an invalid date', () => {
    expect(formatDate('not-a-date')).toBe('');
  });
});

describe('entryId', () => {
  it('extracts the post id after the last dot', () => {
    expect(entryId('tag:blogger.com,1999:blog-123.post-456')).toBe('post-456');
  });

  it('returns the input unchanged when there is no dot', () => {
    expect(entryId('post-456')).toBe('post-456');
  });
});

describe('parseEntry', () => {
  const valid: FeedEntry = {
    id: { $t: 'tag:blogger.com,1999:blog-1.post-1' },
    published: { $t: '2026-04-15T00:00:00.000Z' },
    title: { $t: 'Title 🎓' },
    content: { $t: 'Body 🎓' },
    category: [{ term: 'Scholarships' }],
    link: [{ rel: 'alternate', type: 'text/html', href: 'https://example.com/post' }],
  };

  it('maps a complete entry', () => {
    expect(parseEntry(valid)).toEqual({
      id: 'post-1',
      title: 'Title',
      url: 'https://example.com/post',
      date: 'Apr 2026',
      published: '2026-04-15T00:00:00.000Z',
      category: 'Scholarships',
      contentHtml: 'Body ',
    });
  });

  it('returns null when required fields are missing', () => {
    expect(parseEntry({ id: { $t: 'x.post-1' }, published: { $t: '2026-01-01' } })).toBeNull();
  });
});

describe('parseFeed', () => {
  it('drops invalid entries and sorts newest first', () => {
    const json = {
      feed: {
        entry: [
          {
            id: { $t: 'b.post-old' },
            published: { $t: '2024-01-01T00:00:00.000Z' },
            content: { $t: 'old' },
          },
          { id: { $t: 'b.post-broken' } }, // missing published/content → dropped
          {
            id: { $t: 'b.post-new' },
            published: { $t: '2026-01-01T00:00:00.000Z' },
            content: { $t: 'new' },
          },
        ] as FeedEntry[],
      },
    };
    const posts = parseFeed(json);
    expect(posts.map((p) => p.id)).toEqual(['post-new', 'post-old']);
  });
});

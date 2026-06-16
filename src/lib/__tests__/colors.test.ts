import { withAlpha } from '../../theme/colors';

describe('withAlpha', () => {
  it('expands a 6-digit hex to rgba', () => {
    expect(withAlpha('#0CB4BB', 0.5)).toBe('rgba(12, 180, 187, 0.5)');
  });

  it('expands a 3-digit shorthand hex', () => {
    expect(withAlpha('#fff', 1)).toBe('rgba(255, 255, 255, 1)');
  });

  it('handles zero alpha and pure black', () => {
    expect(withAlpha('#000000', 0)).toBe('rgba(0, 0, 0, 0)');
  });
});

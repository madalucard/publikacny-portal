import { TruncatePipe } from './truncate-pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('should return the original string if shorter than limit', () => {
    expect(pipe.transform('Hello', 120)).toBe('Hello');
  });

  it('should truncate and append ellipsis when over limit', () => {
    const dummyTrollText = 'Trololo :-D '.repeat(100);
    const result = pipe.transform(dummyTrollText, 120);
    expect(result.length).toBe(123); // +3 for dots
    expect(result.endsWith('...')).toBe(true);
  });

  it('should return empty string for falsy input', () => {
    expect(pipe.transform('', 120)).toBe('');
  });
});

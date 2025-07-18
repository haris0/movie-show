import { formatDate } from "./date";

describe('Date utils', () => {
  it('should return correct format', () => {
    const formated = formatDate('2025-06-06')

    expect(formated).toBe('June 6, 2025')
  });
});

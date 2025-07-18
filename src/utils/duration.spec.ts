import { convertMinsToHrsMins } from "./duration";

describe('Duration utils', () => {
  it('should return correct duration', () => {
    const duration = convertMinsToHrsMins(125)

    expect(duration).toBe('2h5m')
  });
});

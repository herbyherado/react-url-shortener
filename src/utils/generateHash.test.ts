import generateHash from './generateHash';
import validateHashID from './validateHashID';

describe('generateHash function', () => {
  it('should output 10 characters', () => {
    const hash = generateHash();

    expect(hash).toBeTruthy();
    expect(typeof hash).toBe('string');
    expect(hash.length).toBe(10);
  });

  it('should output url safe characters', () => {
    const hash = generateHash();

    expect(hash).toBeTruthy();
    expect(validateHashID(hash)).toBe(true);
  });
});

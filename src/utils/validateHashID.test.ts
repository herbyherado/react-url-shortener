import validateHashID from './validateHashID';

describe('validateHashID function', () => {
  it('should return boolean', () => {
    const output = validateHashID('some_id');

    expect(typeof output).toBe('boolean');
  });

  it('should return true', () => {
    expect(validateHashID('OAZxigR9xJ')).toBe(true);
    expect(validateHashID('rpETpebSd7')).toBe(true);
    expect(validateHashID('kZeps-eCwN')).toBe(true);
    expect(validateHashID('azerty')).toBe(true);
    expect(validateHashID('randomID')).toBe(true);
  });

  it('should return false', () => {
    expect(validateHashID('!kjds-12')).toBe(false);
    expect(validateHashID('_04-@j fa')).toBe(false);
    expect(validateHashID('ßa204-2')).toBe(false);
    expect(validateHashID('a(=124{}')).toBe(false);
    expect(validateHashID('*')).toBe(false);
  });
});

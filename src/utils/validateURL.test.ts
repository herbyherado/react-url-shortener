import validateURL from './validateURL';

describe('validateURL function', () => {
  it('should return a boolean', () => {
    const output = validateURL('somerandomurl.com');

    expect(typeof output).toBe('boolean');
  });

  it('should return true', () => {
    expect(validateURL('https://www.example.com')).toBe(true);
    expect(validateURL('http://www.example.com')).toBe(true);
    expect(validateURL('www.example.com')).toBe(true);
    expect(validateURL('example.com')).toBe(true);
    expect(validateURL('http://blog.example.com')).toBe(true);
    expect(validateURL('http://www.example.com#up')).toBe(true);
    expect(validateURL('http://255.255.255.255')).toBe(true);
    expect(validateURL('255.255.255.255')).toBe(true);
    expect(validateURL('http://www.site.com:8008')).toBe(true);
  });

  it('should return false', () => {
    expect(
      validateURL(
        'http://invalid.com/perl.cgi?key= | http://web-site.com/cgi-bin/perl.cgi?key1=value1&key2'
      )
    ).toBe(false);
    expect(validateURL('http://invalid.com/perl.cg´œi')).toBe(false);
    expect(validateURL('http://invalid.com/ßuperßpecial')).toBe(false);
  });
});

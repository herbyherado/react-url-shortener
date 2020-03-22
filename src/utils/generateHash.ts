import generate from 'nanoid/generate';
import urlAlphabet from 'nanoid/url';

/**
 * generates random url safe alphabets
 * with settings of 10 characters and assuming 1,000 IDs generated/hour
 * will take:
 * ~17 years needed, in order to have a 1% probability of at least one collision.
 *
 * see more https://zelark.github.io/nano-id-cc/
 */
export default (): string => generate(urlAlphabet, 10);

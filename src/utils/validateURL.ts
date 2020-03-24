/**
 * Validate string such that it is "url safe"
 * @param {String} url origin address that is to be saved in firestore
 */
export default (url: String): boolean => {
  if (!url) return false;
  const regex = new RegExp(
    /^(?:http(s)?:\/\/)?[a-z0-9.-]+(?:\.[a-z0-9.-]+)+[a-z0-9\-._~:/?#[\]@!$&'()*+,;=.]+$/gi
  );
  if (url.match(regex)) {
    return true;
  }
  return false;
};

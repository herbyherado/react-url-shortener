/**
 * Validate string such that it is "url safe"
 * @param {String} url unique id that is going to be stored in firestore
 */
export default (url: String): boolean => {
  if (!url) return false;
  const regex = new RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
  );
  if (url.match(regex)) {
    return true;
  }
  return false;
};

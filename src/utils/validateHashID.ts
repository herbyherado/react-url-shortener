/**
 * Validate string such that it is "url safe"
 * @param {String} hashID unique id that is going to be stored in firestore
 */
export default (hashID: string): boolean => {
  const regex = new RegExp(/^[a-zA-Z0-9_-]*$/g);
  if (hashID.match(regex)) {
    return true;
  }
  return false;
};

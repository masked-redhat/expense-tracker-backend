/**
 * converts the string/ array string to array of string
 * @param {String | String[]} fields
 * @returns {String[]}
 */
export const strToArray = (fields) =>
  Array.isArray(fields) ? fields : fields.split(" ");

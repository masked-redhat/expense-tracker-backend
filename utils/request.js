/**
 * gets the value for a key, if no key then null
 * @param {Object} data {key: value}
 * @param {Array} keys ['key']
 * @returns {Array} values for keys
 */
const getData = (data, keys = []) => {
  const values = [];
  for (const key of keys) {
    values.push(data[key] ?? null);
  }
  return values;
};

export default getData;

/**
 * Facades an object
 * @param {object} objectToMasque - your object that will be put behind the facade
 * @param {array} keysToExpose - array of keystrings referring to functions / variables to expose.
 *
 * @returns {object} - the facaded object
 */
const masque = (objectToMasque, keysToExpose = false) => {

  if (!objectToMasque || typeof objectToMasque !== 'object')
    throw new TypeError('Parameter "objectToMasque" should be an object.')

  const funcToMapRegex = /(_[a-zA-Z0-9]*)/,
    object = objectToMasque,
    api = keysToExpose ?
      keysToExpose
        .reduce(
          (obj, key) => {
            obj[key] = objectToMasque[key].bind(object)
            return obj
          },
          {}
        ) :
      Object.keys(objectToMasque)
        .filter(
          key => !funcToMapRegex.test(key)
        )
        .reduce(
          (obj, key) => {
            obj[key] = objectToMasque[key].bind(object)
            return obj
          },
          {}
        )

  if (Object.keys(api).length === 0)
    throw Error('Tried to create an empty facade. There were no methods or members to export.')

  return api

}

export default masque

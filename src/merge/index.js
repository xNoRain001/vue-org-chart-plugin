import { getType } from "../utils/index.js"

const merge = function (defaultOptions, options) {
  const keys = Object.keys(options)
  
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    const oldVal = defaultOptions[key]
    const newVal = options[key]

    if (oldVal && oldVal !== newVal) {
      
      // nested object
      if (
        (getType(oldVal) === 'object' && getType(newVal === 'object')) ||
        (getType(oldVal) === 'array' && getType(newVal === 'array'))
      ) {
        merge(oldVal, newVal)
      } else {
        defaultOptions[key] = newVal
      }
    }
  }

  return defaultOptions
}

export default merge
const getType = v => {
  if (v == null) {
    return `${v}`
  }

  const type = typeof v

  return !/^(object|function)$/.test(type)
    ? type
    : Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
}

export default getType
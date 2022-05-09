const getDepth = function (children) {
  if (children.length === 0) {
    return 0
  }

  let depth = Number.MIN_SAFE_INTEGER
  for (let i = 0, l = children.length; i < l; i++) {
    depth = Math.max(depth, getDepth(children[i].children))
  }

  return depth + 1
}

export default getDepth
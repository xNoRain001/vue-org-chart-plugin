import createNode from './createNode'

const formateNode = function (parent, children) {
  for (let i = 0, l = children.length; i < l; i++) {
    const child = children[i]
    const node = createNode(child)
    parent.children.push(node)

    formateNode(node, child.children)
  }
}

export default formateNode
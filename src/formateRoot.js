import createNode from './createNode'

const formateRoot =function (option, vm) {
  const root = createNode(option)
  vm.defaultOption.series[0].data.push(root)
  vm.depth++
}

export default formateRoot
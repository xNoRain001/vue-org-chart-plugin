import createNode from './createNode'

const formateRoot = function (options, vm) {
  const root = createNode(options)
  vm.defaultOptions.series[0].data.push(root)
  vm.depth++
}

export default formateRoot
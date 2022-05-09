import * as echarts from 'echarts'
import formateNode from './formatNode'
import formateRoot from './formateRoot'
import getDepth from './getDepth'
import getHeight from './getHeight'

const mountedFn = function () {
  const vm = this
  const { option, defaultOption } = vm
  
  formateRoot(option, vm)
  formateNode(defaultOption.series[0].data[0], option.children)
  vm.depth += getDepth(defaultOption.series[0].data[0].children)
  getHeight(vm)
  
  const myChart = echarts.init(vm.$el)
  myChart.setOption(defaultOption)

  if (option.config && option.config.autoresize) {
    window.addEventListener('resize', myChart.resize)
  }
}

export default mountedFn
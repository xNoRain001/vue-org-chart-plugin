import * as echarts from 'echarts'
import formateNode from './formatNode'
import formateRoot from './formateRoot'
import getDepth from './getDepth'
import getHeight from './getHeight'

const mountedFn = function () {
  const vm = this
  const { options, defaultOptions } = vm
  
  formateRoot(options, vm)
  formateNode(defaultOptions.series[0].data[0], options.children)
  vm.depth += getDepth(defaultOptions.series[0].data[0].children)
  getHeight(vm)
  
  const myChart = echarts.init(vm.$el)
  myChart.setOption(defaultOptions)

  if (options.config && options.config.autoresize) {
    window.addEventListener('resize', myChart.resize)
  }
}

export default mountedFn
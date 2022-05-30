import * as echarts from 'echarts'
import createNode from '../node/index'
import merge from '../merge/index'
import { getDepth, setHeight } from '../depth/index'

const mountedFn = function () {
  const vm = this
  const { defaultOptions, options } = vm

  // merge options to default options
  if (options.globalStyle) {
    merge(defaultOptions, options.globalStyle)
  }
  
  // create tree
  createNode(vm, undefined, options)

  // get tree depth
  const depth = getDepth(defaultOptions.series[0].data[0].children || [])

  // set tree height
  setHeight(vm.$el, depth)

  // fix org chart's position
  if (depth === 0) {
    defaultOptions.series[0].top = '50%'
  }

  // render org chart
  const myChart = echarts.init(vm.$el)
  myChart.setOption(defaultOptions)

  // autoresize when screen width change
  if (defaultOptions.api.autoresize) {
    window.addEventListener('resize', myChart.resize)
  }
}

export default mountedFn
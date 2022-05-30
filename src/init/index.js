import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreeChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

import defaultData from '../default/index'
import mountedFn from './mountedFn'

use([
  CanvasRenderer,
  TreeChart ,
  GridComponent,
  TooltipComponent
]);

const init = function (Vue, app, h) {
  const { version } = Vue

  if (version[0] === '2') {
    Vue.component('v-org-chart', Vue.extend({
      render: h => h('div'),

      props: ['options'],

      data () {
        return defaultData
      },

      mounted: mountedFn
    }))
  } else {
    app.component('v-org-chart', {
      render () {
        return h('div')
      },

      props: ['options'],

      data () {
        return defaultData
      },
      
      mounted: mountedFn
    })
  }
}

export default init
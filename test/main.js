import Vue from 'vue'
import App from './App.vue'
import orgChart from './vue-org-chart/index'

Vue.use(orgChart)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import { createApp, h } from 'vue'
import App from './App.vue'
import orgChart from 'vue-org-chart-plugin'

const app = createApp(App)
app.use(orgChart, app, h)
app.mount('#app')
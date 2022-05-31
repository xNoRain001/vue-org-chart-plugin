## 效果图

![](assets/imgs/display.png)

## 下载

```
npm i vue-org-chart-plugin echarts
```

## 使用

### Vue 2.x

```html
// main.js
import Vue from 'vue'
import App from './App.vue'
import orgChart from 'vue-org-chart-plugin'

Vue.use(orgChart)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// Foo.vue
<v-org-chart :option='orgChartOption'></v-org-chart>

<script>
export default {
  name: "App",

  data() {
    return {
      orgChartOptions: {
        tooltip: {

          // 节点的值，在 tooltip 中显示。
          value: {
            Position: 'mock',
            Email: 'mock@mock.com'
          },
        },

        avatar: {

          // 头像
          value: 'http://127.0.0.1:8080/assets/avatar/avatar001.png',
        },

        text: {

          // 文本
          value: 'Tayler',
        },

        children: [
          {
            avatar: {
              value: 'http://127.0.0.1:8080/assets/avatar/avatar003.png',
            },
            text: {
              value: 'Brande',
            },
            children: [ /* ... */ ]
          },
          // ...
        ]
      }
    };
  },
};
</script>
```

### Vue 3.x

```html
// main.js
import { createApp, h } from 'vue'
import App from './App.vue'
import orgChart from 'vue-org-chart-plugin'

const app = createApp(App)
app.use(orgChart, app, h)
app.mount('#app')

// Foo.vue
<v-org-chart :options='orgChartOptions'></v-org-chart>

<script>
export default {
	data () {
    return {
      orgChartOptions: {
        // ...
      } 
    }
  }
}
</script>
```


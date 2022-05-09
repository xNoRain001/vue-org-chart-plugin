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
	data () {
    return {
      orgChartOption: {
        // 配置
        config: {
          autoresize: true // 自适应
        },

        // 鼠标悬浮显示内容
        value: {
          Position: ' CEO',
          Email: ' mock@gmail.com'
        },
        
        // 头像
        avatarStyle: {
          image: 'http://127.0.0.1:8080/assets/avatar/avatar001.png',
        },
        
        // 文本
        textStyle: {
          text: 'Tayler',
        },
        
        // 子节点
        children: [
          {
            value: {},
            avatarStyle: {
              image: 'http://127.0.0.1:8080/assets/avatar/avatar002.png',
            },
            textStyle: {
              text: 'Brande',
            },
            children: [ /*...*/ ]
          }
          // ...
        ]
      }
    }
  }
}
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
<v-org-chart :option='orgChartOption'></v-org-chart>

<script>
export default {
	data () {
    return {
      orgChartOption: {
        // ...
      } 
    }
  }
}
</script>
```


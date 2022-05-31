<template>
  <div>
    <v-org-chart :options='orgChartOptions'></v-org-chart>
  </div>
</template>

<script>
export default {
	data () {
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
    }
  }
}
</script>
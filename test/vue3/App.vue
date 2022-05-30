<template>
  <div>
    <v-org-chart :option='orgChartOption'></v-org-chart>
  </div>
</template>

<script>
export default {
	data () {
    return {
      // https://echarts.apache.org/zh/option.html#series-tree.data
      orgChartOption: {
        tooltip: {
          // 节点的值，在 tooltip 中显示。
          value: {
            Position: 'CEO',
            Email: 'mock@gmail.com'
          },
          style: {
            
          }
        },
        avatar: {
          value: 'http://127.0.0.1:8080/assets/avatar/avatar001.png',
          style: {

          }
        },
        text: {
          value: 'Tayler',
          style: {
            
          }
        },
        children: [
          {
            value: {},
            avatarStyle: {
              image: 'http://127.0.0.1:8080/assets/avatar/avatar002.png',
            },
            textStyle: {
              text: 'Brande',
            },
            children: [
              {
                value: {},
                avatarStyle: {
                  image: 'http://127.0.0.1:8080/assets/avatar/avatar004.png',
                },
                textStyle: {
                  text: 'Meritt',
                },
                children: [
                  {
                    value: {},
                    avatarStyle: {
                      image: 'http://127.0.0.1:8080/assets/avatar/avatar006.png',
                    },
                    textStyle: {
                      text: 'Tottie',
                    },
                    children: [
                      {
                        value: {},
                        avatarStyle: {
                          image: 'http://127.0.0.1:8080/assets/avatar/avatar009.png',
                        },
                        textStyle: {
                          text: 'Jessey',
                        },
                        children: []
                      },
                    ]
                  },
                  {
                    value: {},
                    avatarStyle: {
                      image: 'http://127.0.0.1:8080/assets/avatar/avatar007.png',
                    },
                    textStyle: {
                      text: 'Nasim',
                    },
                    children: []
                  },
                  {
                    value: {},
                    avatarStyle: {
                      image: 'http://127.0.0.1:8080/assets/avatar/avatar008.png',
                    },
                    textStyle: {
                      text: 'Pietra',
                    },
                    children: []
                  },
                ]
              },
            ]
          },
          {
            value: {},
            avatarStyle: {
              image: 'http://127.0.0.1:8080/assets/avatar/avatar003.png',
            },
            textStyle: {
              text: 'Wincent',
            },
            children: [
              {
                value: {},
                avatarStyle: {
                  image: 'http://127.0.0.1:8080/assets/avatar/avatar005.png',
                },
                textStyle: {
                  text: 'Ruddy',
                },
                children: [
                  {
                    value: {},
                    avatarStyle: {
                      image: 'http://127.0.0.1:8080/assets/avatar/avatar010.png',
                    },
                    textStyle: {
                      text: 'Bennie',
                    },
                    children: []
                  },
                  {
                    value: {},
                    avatarStyle: {
                      image: 'http://127.0.0.1:8080/assets/avatar/avatar011.png',
                    },
                    textStyle: {
                      text: 'Jacee',
                    },
                    children: []
                  },
                  {
                    value: {},
                    avatarStyle: {
                      image: 'http://127.0.0.1:8080/assets/avatar/avatar012.png',
                    },
                    textStyle: {
                      text: 'Nerine',
                    },
                    children: []
                  },
                ]
              },
            ]
          },
        ]
      }
    }
  }
}
</script>
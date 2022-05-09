const defaultData = {
  defaultOption: {
    tooltip: {
      trigger: "item",
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      textStyle: {
        width: '100%', // 100% 200
        height: '100%', // 100% 200
        color: '#333',
        fontSize: 14,
        fontWeight: 'normal', // normal bold bolder lighter
        overflow: 'none', // none truncate break breakAll
        ellipsis: '...'
      },
      formatter(params) {
        const { value: tip } = params.data
        const keys = Object.keys(tip)
        let tipFormatter = ''
  
        for (let i = 0, l = keys.length; i < l; i++) {
          const k = keys[i]
          const v = tip[k]
          tipFormatter += `${k}:${v}<br />`
        }
  
        return tipFormatter
      },
    },
    series: [
      {
        type: "tree",
        initialTreeDepth: 5, // 初始化时展开层数
        lineStyle: {
          color: '#ccc',
          width: 1
        },
        orient: 'TB', // 方向 BT LR RL
        edgeShape: "polyline", // 直线
        data: []
      }
    ],
  },
  depth: 0
}

export default defaultData
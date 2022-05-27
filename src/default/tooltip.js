// https://echarts.apache.org/zh/option.html#tooltip
const tooltip = {

  // 是否显示提示框
  show: true, // false

  trigger: "item",

  // 是否显示提示框浮层，默认显示。只需tooltip触发事件可配置该项为false。
  showContent: true, // false

  // 是否永远显示提示框内容，默认情况下在移出可触发提示框区域后一定时间后隐藏。
  alwaysShowContent: false, // true

  // 提示框触发的条件
  triggerOn: 'mousemove|click', // mousemove click

  // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为true。
  enterable: false, // true

  // 是否将 tooltip 框限制在图表的区域内。当图表外层的 dom 被设置为 'overflow: hidden'，
  // 或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
  confine: false, // true

  // 提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。
  // position: [10, 10] // 绝对位置，相对于容器左侧 10 px, 上侧 10 px
  // position: ['50%', '50%'] // 相对位置，放置在容器正中间
  // positon: 'inside',

  // 提示框浮层的背景颜色。
  backgroundColor: '#fff',

  // 提示框浮层的边框颜色。
  borderColor: '#ccc',

  // 提示框浮层的边框宽。
  borderWidth: 1,

  // 提示框浮层内边距，单位px，默认各方向内边距为 5 ，接受数组分别设定上右下左边距。
  padding: 5, // 设置内边距为 5
  // padding: [5, 10] // 设置上下的内边距为 5，左右的内边距为 10
  // 分别设置四个方向的内边距
  // padding: [ 
  //     5,  // 上
  //     10, // 右
  //     5,  // 下
  //     10, // 左
  // ]

  // 提示框浮层的文本样式。
  textStyle: {

    // 文本显示宽度。
    width: '100%', // 100% 200

    // 文本显示高度。
    height: '100%', // 100% 200

    // 文字的颜色。
    color: '#333',

    // 文字的字体大小。
    fontSize: 14,

    // 文字字体的粗细。
    fontWeight: 'normal', // bold bolder lighter

    // 文字超出宽度是否截断或者换行。配置width时有效
    overflow: 'none', // truncate break breakAll

    // 在overflow配置为'truncate'的时候，可以通过该属性配置末尾显示的文本。
    ellipsis: '...'
  },

  formatter(params, ticket, callback) {
    if (params.data.value == null) {
      return
    }

    // value <=> options.tooltip.value
    const { value } = params.data

    let tooltipHTML = ''

    if (!/^(String|Object)$/.test(Object.prototype.toString.call(value).slice(8, -1))) {
      throw new Error('Value is expecting: String or Object')
    }

    if (typeof value === 'string') {
      tooltipHTML = value
    } else {
      const keys = Object.keys(value)
      
      for (let i = 0, l = keys.length; i < l; i++) {
        const k = keys[i]
        const v = value[k]
        tooltipHTML += `${ k }: ${ v }<br />`
      }
    }

    return tooltipHTML
  },
}

export default tooltip
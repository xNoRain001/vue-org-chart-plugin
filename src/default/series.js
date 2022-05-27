// https://echarts.apache.org/zh/option.html#series-tree
const series = [
  {
    type: "tree",

    // 树图中正交布局的方向，也就是说只有在 layout = 'orthogonal' 的时候，该配置项才生效。
    orient: 'TB', // BT LR RL

    // 边的形状。分别有曲线和折线两种
    edgeShape: "polyline", // curve

    // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，
    // 可以设置成 'scale' 或者 'move'。设置成 true 为都开启
    roam: false, // true scale move

    // 子树折叠和展开的交互，默认打开。
    expandAndCollapse: true, // false

    // 树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点。
    // 如果设置为 -1 或者 null 或者 undefined，所有节点都将展开。
    initialTreeDepth: 2, // 初始化时展开层数

    // 定义树图边的样式。
    lineStyle: {

      // 树图边的颜色。
      color: '#ccc',

      // 树图边的宽度。
      width: 1
    },

    data: []
  }
]

export default series
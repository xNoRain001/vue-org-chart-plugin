import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { TreeChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts';

var depth = 0;

// https://echarts.apache.org/zh/option.html#tooltip
var tooltip = {
  // 是否显示提示框
  show: true,
  // false
  trigger: "item",
  // 是否显示提示框浮层，默认显示。只需tooltip触发事件可配置该项为false。
  showContent: true,
  // false
  // 是否永远显示提示框内容，默认情况下在移出可触发提示框区域后一定时间后隐藏。
  alwaysShowContent: false,
  // true
  // 提示框触发的条件
  triggerOn: 'mousemove|click',
  // mousemove click
  // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为true。
  enterable: false,
  // true
  // 是否将 tooltip 框限制在图表的区域内。当图表外层的 dom 被设置为 'overflow: hidden'，
  // 或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
  confine: false,
  // true
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
  padding: 5,
  // 设置内边距为 5
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
    width: '100%',
    // 100% 200
    // 文本显示高度。
    height: '100%',
    // 100% 200
    // 文字的颜色。
    color: '#333',
    // 文字的字体大小。
    fontSize: 14,
    // 文字字体的粗细。
    fontWeight: 'normal',
    // bold bolder lighter
    // 文字超出宽度是否截断或者换行。配置width时有效
    overflow: 'none',
    // truncate break breakAll
    // 在overflow配置为'truncate'的时候，可以通过该属性配置末尾显示的文本。
    ellipsis: '...'
  },
  formatter: function formatter(params, ticket, callback) {
    if (params.data.value == null) {
      return;
    } // value <=> options.tooltip.value


    var value = params.data.value;
    var tooltipHTML = '';

    if (!/^(String|Object)$/.test(Object.prototype.toString.call(value).slice(8, -1))) {
      throw new Error('Value is expecting: String or Object');
    }

    if (typeof value === 'string') {
      tooltipHTML = value;
    } else {
      var keys = Object.keys(value);

      for (var i = 0, l = keys.length; i < l; i++) {
        var k = keys[i];
        var v = value[k];
        tooltipHTML += "".concat(k, ": ").concat(v, "<br />");
      }
    }

    return tooltipHTML;
  }
};

// https://echarts.apache.org/zh/option.html#series-tree
var series = [{
  type: "tree",
  // 树图中正交布局的方向，也就是说只有在 layout = 'orthogonal' 的时候，该配置项才生效。
  orient: 'TB',
  // BT LR RL
  // 边的形状。分别有曲线和折线两种
  edgeShape: "polyline",
  // curve
  // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，
  // 可以设置成 'scale' 或者 'move'。设置成 true 为都开启
  roam: false,
  // true scale move
  // 子树折叠和展开的交互，默认打开。
  expandAndCollapse: true,
  // false
  // 树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点。
  // 如果设置为 -1 或者 null 或者 undefined，所有节点都将展开。
  initialTreeDepth: 2,
  // 初始化时展开层数
  // 定义树图边的样式。
  lineStyle: {
    // 树图边的颜色。
    color: '#ccc',
    // 树图边的宽度。
    width: 1
  },
  data: []
}];

var config = {
  autoresize: false
};

var options = {
  config: config,
  tooltip: tooltip,
  series: series
};

var defaultData = {
  defaultOptions: options,
  depth: depth
};

var createNode = function createNode(options) {
  var tooltip = options.tooltip,
      avatarStyle = options.avatarStyle,
      textStyle = options.textStyle;
  var listOfColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
  var node = {
    value: tooltip === null || tooltip === void 0 ? void 0 : tooltip.value,
    label: {
      formatter: ["{avatar|}", "{text|".concat(textStyle.text, "}")].join("\n"),
      align: "center",
      verticalAlign: "middle",
      rich: {
        avatar: {
          // if don't set image, set background color as image
          backgroundColor: avatarStyle.image ? {
            image: avatarStyle.image
          } : listOfColors[Math.floor(Math.random() * 9)],
          height: 60,
          width: 60,
          borderRadius: 50
        },
        text: {
          color: '#333',
          // 文字字体的粗细。
          fontWeight: 'normal',
          // bold bolder lighter
          // 文字的字体大小。
          fontSize: 12,
          // 文字水平对齐方式，默认自动。如果没有设置 align，则会取父层级的 align
          // align: 'center', // left right
          // verticalAlign
          // verticalAlign: 'middle' // top bottom
          // 文字块背景色。
          backgroundColor: '#fff',
          // transparent
          // 文字块边框颜色。
          borderColor: 'inherit',
          // 文字块边框描边类型。
          borderType: 'solid',
          // dashed dotted
          // 文字块的圆角。
          // borderRadius: 50,
          // 文字块的内边距
          // padding: 5,
          // padding: [3, 4, 5, 6]：表示 [上, 右, 下, 左] 的边距。
          // padding: 4：表示 padding: [4, 4, 4, 4]。
          // padding: [3, 4]：表示 padding: [3, 4, 3, 4]。
          // 文字块的宽度。一般不用指定，不指定则自动是文字的宽度。
          // width: 100,
          // 文字块的高度。一般不用指定，不指定则自动是文字的高度。
          height: 30
        }
      }
    },
    // tooltip: {
    //   textStyle: {
    //     // position
    //     // backgroundColor
    //     // borderColor
    //     // borderWidth
    //     // padding
    //     textStyle: {
    //       // color
    //       // fontWeight
    //       // fontSize
    //       // width
    //       // height
    //       // overflow
    //       // ellipsis
    //     }
    //   }
    // },
    children: []
  };
  return node;
};

var formateNode = function formateNode(parent, children) {
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var node = createNode(child);
    parent.children.push(node);
    formateNode(node, child.children);
  }
};

var formateRoot = function formateRoot(options, vm) {
  var root = createNode(options);
  vm.defaultOptions.series[0].data.push(root);
  vm.depth++;
};

var getDepth = function getDepth(children) {
  if (children.length === 0) {
    return 0;
  }

  var depth = Number.MIN_SAFE_INTEGER;

  for (var i = 0, l = children.length; i < l; i++) {
    depth = Math.max(depth, getDepth(children[i].children));
  }

  return depth + 1;
};

var getHeight = function getHeight(vm) {
  vm.$el.style.height = vm.depth * 140 + 140 + 'px';
};

var mountedFn = function mountedFn() {
  var vm = this;
  var options = vm.options,
      defaultOptions = vm.defaultOptions;
  formateRoot(options, vm);
  formateNode(defaultOptions.series[0].data[0], options.children);
  vm.depth += getDepth(defaultOptions.series[0].data[0].children);
  getHeight(vm);
  var myChart = echarts.init(vm.$el);
  myChart.setOption(defaultOptions);

  if (options.config && options.config.autoresize) {
    window.addEventListener('resize', myChart.resize);
  }
};

use([CanvasRenderer, TreeChart, GridComponent, TooltipComponent]);

var init = function init(Vue, app, h) {
  var version = Vue.version;

  if (version[0] === '2') {
    Vue.component('v-org-chart', Vue.extend({
      render: function render(h) {
        return h('div');
      },
      props: ['options'],
      data: function data() {
        return defaultData;
      },
      mounted: mountedFn
    }));
  } else {
    app.component('v-org-chart', {
      render: function render() {
        return h('div');
      },
      props: ['options'],
      data: function data() {
        return defaultData;
      },
      mounted: mountedFn
    });
  }
};

var orgChart = function orgChart(Vue, app, h) {
  init(Vue, app, h);
};

export { orgChart as default };

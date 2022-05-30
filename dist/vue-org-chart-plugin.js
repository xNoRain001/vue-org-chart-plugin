import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { TreeChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts';

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
  initialTreeDepth: 5,
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

var api = {
  autoresize: false
};

var options = {
  tooltip: tooltip,
  series: series,
  api: api
};

var data = {
  defaultOptions: options
};

var createNode = function createNode(vm, parent, options) {
  if (parent == null) {
    // create root
    var root = _createNode(options);

    vm.defaultOptions.series[0].data.push(root);
    createNode(vm, root, options.children || []);
  } else {
    // create node
    for (var i = 0, l = options.length; i < l; i++) {
      var childOptions = options[i];

      var node = _createNode(childOptions);

      parent.children.push(node);
      createNode(vm, node, childOptions.children || []);
    }
  }
};

var _createNode = function _createNode(options) {
  var _tooltipStyle$textSty, _tooltipStyle$textSty2, _tooltipStyle$textSty3, _tooltipStyle$textSty4, _tooltipStyle$textSty5, _tooltipStyle$textSty6, _tooltipStyle$textSty7;

  var _ref = options.tooltip || {},
      tooltipValue = _ref.value,
      _ref$style = _ref.style,
      tooltipStyle = _ref$style === void 0 ? {} : _ref$style;

  var _ref2 = options.avatar || {},
      avatarValue = _ref2.value,
      _ref2$style = _ref2.style,
      avatarStyle = _ref2$style === void 0 ? {} : _ref2$style;

  var _options$text = options.text,
      textValue = _options$text.value,
      _options$text$style = _options$text.style,
      textStyle = _options$text$style === void 0 ? {} : _options$text$style;
  var listOfColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
  var node = {
    value: tooltipValue,
    // https://echarts.apache.org/zh/option.html#series-tree.label
    label: {
      formatter: ["{avatar|}", "{text|".concat(textValue, "}")].join("\n"),
      align: "center",
      verticalAlign: "middle",
      rich: {
        avatar: {
          // if haven't set image, set background color as image
          backgroundColor: avatarValue ? {
            image: avatarValue
          } : listOfColors[Math.floor(Math.random() * 9)],
          height: avatarStyle.height || 60,
          width: avatarStyle.width || 60,
          borderRadius: avatarStyle.borderRadius || 50
        },
        text: {
          color: textStyle.color || '#333',
          // 文字字体的粗细。
          fontWeight: textStyle.fontWeight || 'normal',
          // bold bolder lighter
          // 文字的字体大小。
          fontSize: textStyle.fontSize || 12,
          // 文字水平对齐方式，默认自动。如果没有设置 align，则会取父层级的 align
          // align: 'center', // left right
          // verticalAlign
          // verticalAlign: 'middle' // top bottom
          // 文字块背景色。
          backgroundColor: textStyle.backgroundColor || '#fff',
          // transparent
          // 文字块的宽度。一般不用指定，不指定则自动是文字的宽度。
          // width: 100,
          // 文字块的高度。一般不用指定，不指定则自动是文字的高度。
          height: 20
        }
      }
    },
    // https://echarts.apache.org/zh/option.html#series-tree.tooltip
    tooltip: {
      position: tooltipStyle.position || null,
      backgroundColor: tooltipStyle.backgroundColor || null,
      borderColor: tooltipStyle.borderColor || null,
      borderWidth: tooltipStyle.borderWidth || null,
      padding: tooltipStyle.padding || null,
      textStyle: {
        color: (_tooltipStyle$textSty = tooltipStyle.textStyle) === null || _tooltipStyle$textSty === void 0 ? void 0 : _tooltipStyle$textSty.color,
        fontWeight: (_tooltipStyle$textSty2 = tooltipStyle.textStyle) === null || _tooltipStyle$textSty2 === void 0 ? void 0 : _tooltipStyle$textSty2.fontWeight,
        fontSize: (_tooltipStyle$textSty3 = tooltipStyle.textStyle) === null || _tooltipStyle$textSty3 === void 0 ? void 0 : _tooltipStyle$textSty3.fontSize,
        width: (_tooltipStyle$textSty4 = tooltipStyle.textStyle) === null || _tooltipStyle$textSty4 === void 0 ? void 0 : _tooltipStyle$textSty4.width,
        height: (_tooltipStyle$textSty5 = tooltipStyle.textStyle) === null || _tooltipStyle$textSty5 === void 0 ? void 0 : _tooltipStyle$textSty5.height,
        overflow: (_tooltipStyle$textSty6 = tooltipStyle.textStyle) === null || _tooltipStyle$textSty6 === void 0 ? void 0 : _tooltipStyle$textSty6.overflow,
        ellipsis: (_tooltipStyle$textSty7 = tooltipStyle.textStyle) === null || _tooltipStyle$textSty7 === void 0 ? void 0 : _tooltipStyle$textSty7.ellipsis
      }
    },
    children: []
  };
  return node;
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var getType = function getType(v) {
  if (v == null) {
    return "".concat(v);
  }

  var type = _typeof(v);

  return !/^(object|function)$/.test(type) ? type : Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
};

var merge = function merge(defaultOptions, options) {
  var keys = Object.keys(options);

  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var oldVal = defaultOptions[key];
    var newVal = options[key];

    if (oldVal && oldVal !== newVal) {
      // nested object
      if (getType(oldVal) === 'object' && getType(newVal === 'object')) {
        merge(oldVal, newVal);
      } else {
        defaultOptions[key] = newVal;
      }
    }
  }

  return defaultOptions;
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

var setHeight = function setHeight(tree, depth) {
  tree.style.height = 180 * (depth + 1) + 'px';
};

var mountedFn = function mountedFn() {
  var vm = this;
  var defaultOptions = vm.defaultOptions,
      options = vm.options; // merge options to default options

  if (options.globalStyle) {
    merge(defaultOptions, options.globalStyle);
  } // create tree


  createNode(vm, undefined, options); // get tree depth

  var depth = getDepth(defaultOptions.series[0].data[0].children || []); // set tree height

  setHeight(vm.$el, depth); // fix org chart's position

  if (depth === 0) {
    defaultOptions.series[0].top = '50%';
  } // render org chart


  var myChart = echarts.init(vm.$el);
  myChart.setOption(defaultOptions); // autoresize when screen width change

  if (defaultOptions.api.autoresize) {
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
      data: function data$1() {
        return data;
      },
      mounted: mountedFn
    }));
  } else {
    app.component('v-org-chart', {
      render: function render() {
        return h('div');
      },
      props: ['options'],
      data: function data$1() {
        return data;
      },
      mounted: mountedFn
    });
  }
};

var orgChart = function orgChart(Vue, app, h) {
  init(Vue, app, h);
};

export { orgChart as default };

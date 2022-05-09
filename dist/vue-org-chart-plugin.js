import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { TreeChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts';

var defaultData = {
  defaultOption: {
    tooltip: {
      trigger: "item",
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      textStyle: {
        width: '100%',
        // 100% 200
        height: '100%',
        // 100% 200
        color: '#333',
        fontSize: 14,
        fontWeight: 'normal',
        // normal bold bolder lighter
        overflow: 'none',
        // none truncate break breakAll
        ellipsis: '...'
      },
      formatter: function formatter(params) {
        var tip = params.data.value;
        var keys = Object.keys(tip);
        var tipFormatter = '';

        for (var i = 0, l = keys.length; i < l; i++) {
          var k = keys[i];
          var v = tip[k];
          tipFormatter += "".concat(k, ":").concat(v, "<br />");
        }

        return tipFormatter;
      }
    },
    series: [{
      type: "tree",
      initialTreeDepth: 5,
      // 初始化时展开层数
      lineStyle: {
        color: '#ccc',
        width: 1
      },
      orient: 'TB',
      // 方向 BT LR RL
      edgeShape: "polyline",
      // 直线
      data: []
    }]
  },
  depth: 0
};

var createNode = function createNode(option) {
  var value = option.value,
      avatarStyle = option.avatarStyle,
      textStyle = option.textStyle;
  var node = {
    value: value,
    label: {
      formatter: ["{avatar|}", "{text|".concat(textStyle.text, "}")].join("\n"),
      align: "center",
      verticalAlign: "middle",
      rich: {
        avatar: {
          backgroundColor: {
            image: avatarStyle.image
          },
          height: 60,
          width: 60
        },
        text: {
          color: '#333',
          backgroundColor: "#fff",
          height: 30
        }
      }
    },
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

var formateRoot = function formateRoot(option, vm) {
  var root = createNode(option);
  vm.defaultOption.series[0].data.push(root);
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
  vm.$el.style.height = vm.depth * 110 + 120 + 'px';
};

var mountedFn = function mountedFn() {
  var vm = this;
  var option = vm.option,
      defaultOption = vm.defaultOption;
  formateRoot(option, vm);
  formateNode(defaultOption.series[0].data[0], option.children);
  vm.depth += getDepth(defaultOption.series[0].data[0].children);
  getHeight(vm);
  var myChart = echarts.init(vm.$el);
  myChart.setOption(defaultOption);

  if (option.config && option.config.autoresize) {
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
      props: ['option'],
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
      props: ['option'],
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

const createNode = function (vm, parent, options) {
  if (parent == null) { // create root
    const root = _createNode(options)

    vm.defaultOptions.series[0].data.push(root)

    createNode(vm, root, options.children || [])
  } else { // create node
    for (let i = 0, l = options.length; i < l; i++) {
      const childOptions = options[i]
      const node = _createNode(childOptions)
      
      parent.children.push(node)
  
      createNode(vm, node, childOptions.children || [])
    }
  }
}

const _createNode = function (options) {
  const { value: tooltipValue, style: tooltipStyle = {} } = options.tooltip || {}
  const { value: avatarValue, style: avatarStyle = {} } = options.avatar || {}
  const { value: textValue, style: textStyle = {} } = options.text
  const listOfColors = [
    '#5470c6', 
    '#91cc75', 
    '#fac858', 
    '#ee6666', 
    '#73c0de', 
    '#3ba272', 
    '#fc8452', 
    '#9a60b4', 
    '#ea7ccc'
  ]
  const node = {
    value: tooltipValue,

    // https://echarts.apache.org/zh/option.html#series-tree.label
    label: {
      formatter: ["{avatar|}", `{text|${ textValue }}`].join("\n"),
      align: "center",
      verticalAlign: "middle",
      rich: {
        avatar: {

          // if haven't set image, set background color as image
          backgroundColor: avatarValue
            ? {
                image: avatarValue,
              }
            : listOfColors[Math.floor(Math.random() * 9)],
          height: avatarStyle.height || 60,
          width: avatarStyle.width || 60,
          borderRadius: avatarStyle.borderRadius || 50,
        },
        text: {
          color: textStyle.color || '#333',
          // 文字字体的粗细。
          fontWeight: textStyle.fontWeight || 'normal', // bold bolder lighter
          // 文字的字体大小。
          fontSize: textStyle.fontSize || 12,
          // 文字水平对齐方式，默认自动。如果没有设置 align，则会取父层级的 align
          // align: 'center', // left right
          // verticalAlign
          // verticalAlign: 'middle' // top bottom
          // 文字块背景色。
          backgroundColor: textStyle.backgroundColor || '#fff', // transparent
          // 文字块的宽度。一般不用指定，不指定则自动是文字的宽度。
          // width: 100,
          // 文字块的高度。一般不用指定，不指定则自动是文字的高度。
          height: 20,
        },
      },
    },

    // https://echarts.apache.org/zh/option.html#series-tree.tooltip
    tooltip: {
      position: tooltipStyle.position || null,
      backgroundColor: tooltipStyle.backgroundColor || null,
      borderColor: tooltipStyle.borderColor || null,
      borderWidth: tooltipStyle.borderWidth || null,
      padding: tooltipStyle.padding || null,
      textStyle: {
        color: tooltipStyle.textStyle?.color,
        fontWeight: tooltipStyle.textStyle?.fontWeight,
        fontSize: tooltipStyle.textStyle?.fontSize,
        width: tooltipStyle.textStyle?.width,
        height: tooltipStyle.textStyle?.height,
        overflow: tooltipStyle.textStyle?.overflow,
        ellipsis: tooltipStyle.textStyle?.ellipsis
      }
    },
    children: []
  }

  return node
}

export default createNode
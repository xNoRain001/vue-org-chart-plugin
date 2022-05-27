const createNode = function (options) {
  const { tooltip, avatarStyle, textStyle } = options
  const listOfColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
  const node = {
    value: tooltip?.value,
    label: {
      formatter: ["{avatar|}", `{text|${ textStyle.text }}`].join("\n"),
      align: "center",
      verticalAlign: "middle",
      rich: {
        avatar: {

          // if don't set image, set background color as image
          backgroundColor: avatarStyle.image
            ? {
                image: avatarStyle.image,
              }
            : listOfColors[Math.floor(Math.random() * 9)],
          height: 60,
          width: 60,
          borderRadius: 50,
        },
        text: {
          color: '#333',
          // 文字字体的粗细。
          fontWeight: 'normal', // bold bolder lighter
          // 文字的字体大小。
          fontSize: 12,
          // 文字水平对齐方式，默认自动。如果没有设置 align，则会取父层级的 align
          // align: 'center', // left right
          // verticalAlign
          // verticalAlign: 'middle' // top bottom
          // 文字块背景色。
          backgroundColor: '#fff', // transparent
          // 文字块边框颜色。
          borderColor: 'inherit',
          // 文字块边框描边类型。
          borderType: 'solid', // dashed dotted
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
          height: 30,
        },
      },
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
  }

  return node
}

export default createNode
const createNode = function (option) {
  const { value, avatarStyle, textStyle } = option
  const node = {
    value,
    label: {
      formatter: ["{avatar|}", `{text|${textStyle.text}}`].join("\n"),
      align: "center",
      verticalAlign: "middle",
      rich: {
        avatar: {
          backgroundColor: {
            image: avatarStyle.image,
          },
          height: 60,
          width: 60,
        },
        text: {
          color: '#333',
          backgroundColor: "#fff",
          height: 30,
        },
      },
    },
    children: []
  }

  return node
}

export default createNode
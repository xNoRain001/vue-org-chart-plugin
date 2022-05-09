import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',

  output: {
    file: './dist/vue-org-chart-plugin.js',
  },
  
  plugins: [
    babel({
      exclude: './node_modules/**'
    }),
  ]
}
// You can install more packages below to config more as you like:
// eslint
// babel-eslint
// eslint-config-standard
// eslint-loader
// eslint-plugin-html
// eslint-plugin-promise
// eslint-plugin-standard
// postcss-cssnext

var path = require('path')
var webpack = require('webpack')

var bannerPlugin = new webpack.BannerPlugin(
  '// { "framework": "Vue" }\n',
  { raw: true }
)

function getBaseConfig () {
  return {
    entry: {
      app: path.resolve('./src/app.js'),
      about: path.resolve('./src/entry/about.js'),
      addtruck: path.resolve('./src/entry/addtruck.js'),
      detail: path.resolve('./src/entry/detail.js'),
      DiscussDetail: path.resolve('./src/entry/discuss-detail.js'),
      feedback: path.resolve('./src/entry/feedback.js'),
      MoreTruckList: path.resolve('./src/entry/more-truck-list.js'),
      MYNew: path.resolve('./src/entry/my-new.js'),
      PeopleList: path.resolve('./src/entry/people-list.js'),
      report: path.resolve('./src/entry/report.js'),
      search: path.resolve('./src/entry/search.js'),
      set: path.resolve('./src/entry/set.js'),
      topic: path.resolve('./src/entry/topic.js'),
      user: path.resolve('./src/entry/user.js'),
      LookImg: path.resolve('./src/entry/look-img.js')
    },
    output: {
      path: 'dist',
    },
    module: {
      // // You can use ESLint now!
      // // Please:
      // // 1. npm install {
      // //   babel-eslint
      // //   eslint
      // //   eslint-config-standard
      // //   eslint-loader
      // //   eslint-plugin-html
      // //   eslint-plugin-promise
      // // } --save-dev
      // // 2. set .eslintrc
      // //   take { "extends": "standard" } for example
      // //   so you need: npm install eslint-plugin-standard --save-dev
      // // 3. set the config below
      // preLoaders: [
      //   {
      //     test: /\.vue$/,
      //     loader: 'eslint',
      //     exclude: /node_modules/
      //   },
      //   {
      //     test: /\.js$/,
      //     loader: 'eslint',
      //     exclude: /node_modules/
      //   }
      // ],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }, {
          test: /\.vue(\?[^?]+)?$/,
          loaders: []
        }
      ]
    },
    vue: {
      // // You can use PostCSS now!
      // // Take cssnext for example:
      // // 1. npm install postcss-cssnext --save-dev
      // // 2. write `var cssnext = require('postcss-cssnext')` at the top
      // // 3. set the config below
      // postcss: [cssnext({
      //   features: {
      //     autoprefixer: false
      //   }
      // })]
    },
    plugins: [bannerPlugin]
  }
}

var webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.loaders[1].loaders.push('vue')

var weexConfig = getBaseConfig()
weexConfig.output.filename = '[name].weex.js'
weexConfig.module.loaders[1].loaders.push('weex')

module.exports = [webConfig, weexConfig]

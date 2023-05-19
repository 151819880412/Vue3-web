# 依赖
  1. element-plus
  ```shell
  # NPM
  $ npm install element-plus --save

  # Yarn
  $ yarn add element-plus

  # pnpm
  $ pnpm install element-plus
  ```
  2. nprogress
  ```shell
    npm install nprogress
    npm install @types/nprogress -D
  ```
  3. pinia
  ```shell
    npm install pinia
  ```
  4. axios
  ```shell
    npm install axios
  ```
  5. lodash
  ```shell
    npm install --save-dev @types/lodash
  ```
  6. mitt
  ```shell
    npm install mitt -S
  ```
  7. element-plus/icons-vue
  ```shell
    npm install @element-plus/icons-vue
  ```
  8. svg-sprite-loader
  ```shell
    npm i svg-sprite-loader -D
    需要配合vue.config.js
    chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
	}
  ```
  
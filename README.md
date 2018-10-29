# webpack-jquery-template

适用于jquery项目的webpack模版配置。

## 功能
1.babel-env 可转换es6/7

2.postcss 可自动补全浏览器前缀支持less

3.支持开发环境proxy跨域

## 注意
直接写在html标签中不经过js引入的静态资源，如img等需放在static文件夹中，该文件夹不经过webpack打包直接复制到dist目录。

经过webpack打包的js文件需放在src目录
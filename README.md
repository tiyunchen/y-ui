# y-ui
react 的UI框架，使用ts创建

`yarn start`

本地开发环境启动

`yarn run build:doc`

文档生成

`yarn run build`

组件库构建

`yarn run new`

创建新的组件

项目内按需引入:

`npm install babel-plugin-import -D`

.babelrc  plugins 添加

```
["import", {
        "libraryName": "你导入的UI库name",
        "style": "css"
 }]
 ```

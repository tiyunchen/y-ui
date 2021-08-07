import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'y-ui',
  outputPath: 'docs-dist',
  sass: {
    // 默认值 Dart Sass，如果要改用 Node Sass，可安装 node-sass 依赖，然后使用该配置项
    // implementation: require('node-sass'),
    // 传递给 Dart Sass 或 Node Sass 的配置项，可以是一个 Function
    sassOptions: {},
  },
  define: {
    // baseInfo: {},
  },

  //  在 html head 插入 baseInfo
  headScripts: [

  ],
  scripts: [

  ],
  styles: [

  ],
});

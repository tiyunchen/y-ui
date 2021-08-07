import { NodePlopAPI } from 'plop';

const path = require('path')

export default function(plop: NodePlopAPI) {
    plop.setGenerator('component', {
        description: '创建一个新组件',
        prompts: [
            { type: 'input', name: 'name', message: '请输入组件名称（多个单词以中横线命名, 英文）' },
            { type: 'input', name: 'CN', message: '请输入组件中文名称' },
            { type: 'input', name: 'description', message: '请输入组件描述' },
        ],
        actions: [
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/index.tsx'),
                templateFile: path.resolve(__dirname, '../templates/component/index.hbs'),
            },
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/{{kebabCase name}}.tsx'),
                templateFile: path.resolve(__dirname, '../templates/component/comp.hbs'),
            },
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/style/index.less'),
                templateFile: path.resolve(__dirname, '../templates/component/style/style.hbs'),
            },
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/style/index.tsx'),
                templateFile: path.resolve(__dirname, '../templates/component/style/index.hbs'),
            },
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/index.md'),
                templateFile: path.resolve(__dirname, '../templates/component/doc.hbs'),
            },
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/interface.ts'),
                templateFile: path.resolve(__dirname, '../templates/component/interface.hbs'),
            },
            {
                type: 'add',
                path: path.resolve(__dirname, '../components/{{kebabCase name}}/demo/basic.tsx'),
                templateFile: path.resolve(__dirname, '../templates/component/demo/basic.hbs'),
            },
            // {
            //     type: 'add',
            //     path: path.resolve(__dirname, '../components/{{kebabCase name}}/__tests__/index.test.tsx'),
            //     templateFile: path.resolve(__dirname, '../templates/component/__tests__/index.test.hbs'),
            // },
            {
                type: 'append',
                path: path.resolve(__dirname, '../components/index.tsx'),
                template: "export { default as {{pascalCase name}} } from './{{kebabCase name}}';\nexport type { {{pascalCase name}}Props } from './{{kebabCase name}}/interface'",
            },
        ],
    });
}


const COMPONENT_TYPE = [
    '全局组件',
    '局部组件'
]
// eslint-disable-next-line no-undef
module.exports = function (plop) {
    // controller generator
    plop.setGenerator('components', {
        description: 'application components logic',
        prompts: [
            {
                type: 'list',
                name: 'choose_type',
                message: '请选择要创建的组件为全局组件还是局部组件',
                choices: COMPONENT_TYPE,//如果需要其他处理choices可以用函数并接受参数answers如果之前有其他prompt则是其他的回答
            },
            {
                type: 'input',
                name: 'position',
                message: '请输入局部组件要创建的路径，默认位置src/components）',
                default: 'src/components',
                validate(input) {
                    const done = this.async()
                    if (!input.startsWith('src')) {
                        done('路径必须以src/开头')
                    }
                    if (!input.includes('/')) {
                        done('路径必须以/连接')
                    }
                    done(null, true);
                },
                when(answers) {
                    const { choose_type } = answers
                    if (choose_type === COMPONENT_TYPE[1]) {//当局部组件调用该生成器
                        return true
                    }
                    return
                },
            },
            {
                type: 'input',
                name: 'name',
                message: '请输入要创建的组件名（大驼峰）',
                validate(value) {
                    const done = this.async()
                    if (!value.trim()) {
                        done('组件名不能为空')
                        return
                    }
                    done(null, true);
                }
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/{{name}}/index.vue',
                templateFile: './config/cli/templateFile/components.hbs',
                force: true,
                skip(answers) {
                    const { position } = answers
                    if (position) {
                        this.path = position + '/{{name}}/index.vue'
                    } else {//局部组件
                        this.path = answers.choose_type === COMPONENT_TYPE[0]
                            ? 'src/components/global/{{name}}/index.vue'
                            : 'src/views/{{name}}/index.vue'
                    }
                },
             
            }
        ]
    });
}



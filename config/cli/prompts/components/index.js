export const prompts = [
    {
        type: 'list',
        name: 'choose_type',
        message: '请选择要创建的组件为全局组件还是局部组件',
        choices(answers) {//answers如果之前有其他prompt则是其他的回答
            return [
                '全局组件',
                '局部组件'
            ]
        }
    },
    {
        type: 'input',
        name: 'name',
        message: '请输入要创建的组件名（大驼峰）',
        validate(value) {
            const done = this.async()
            if (!value.trim() ) {
                done('组件名不能为空')
                return 
            }
            done(null, true);
        }
    }
]
export default {
    functional: true,
    inject: ['tableRoot'],
    props: {
        row: Object,
        column: Object,
        index: Number
    },
    //使用纯函数来创建作用域插槽
    render: (h, ctx) => {
        return h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
            row: ctx.props.row,
            column: ctx.props.column,
            index: ctx.props.index
        }));
    }
}
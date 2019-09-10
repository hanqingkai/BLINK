// behavior 公共方法  类似java中的继承
let classicBeh = Behavior({
    /**
     * 组件的属性列表
     */
    properties: {
        img: String,
        content: String,
        hidden: Boolean
    },
    //还可以定义其他的行为方法
    //组件的生命周期函数
    attached: function() {},
    //组件中的方法
    data: {},
    methods: {}
})
export {
    classicBeh
}
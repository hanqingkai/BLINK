// components/tag/index.js
Component({
    //自定义外部样式class功能 名字自定义
    externalClasses: ['tag-class'],

    options: {
        //启用slot插槽
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        text: String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(e) {
            //触发自定义事件
            this.triggerEvent('taping', {
                text: this.properties.text
            })
        }
    }
})
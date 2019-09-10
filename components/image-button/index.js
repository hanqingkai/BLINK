// components/image-button/index.js
Component({
    //开启插槽
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        openType: { //两个单词使用时要拆开 open-type
            type: String
        }
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
        onGetUserInfo(e) {
            //暴露方法名 getuserinfo
            this.triggerEvent('getuserinfo', e.detail, {})
        }
    }
})
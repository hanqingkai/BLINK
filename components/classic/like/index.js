Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean, //默认是false
            // value: true,
            // observer:{

            // }
        },
        count: {
            type: Number
        },
        //只读属性 不可点击
        readOnly: {
            type: Boolean
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc: "/components/classic/like/images/like.png",
        noSrc: "/components/classic/like/images/like@dis.png"
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike: function(e) {
            if (this.properties.readOnly) {
                return
            }
            let like = this.properties.like;
            let count = this.properties.count
            count = like ? count - 1 : count + 1;
            this.setData({
                count: count,
                like: !like
            })
            let behavior = this.properties.like ? 'like' : 'cancle';
            this.triggerEvent('like', { behavior: behavior }, {})
        }
    }
})
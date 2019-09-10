// 分页功能
const paginationBev = Behavior({

    data: {
        dataArray: [],
        total: null, //后台配置的数据总数量，不返回总数量需要用其他方法来判断
        nonoeResult: false,
        loading: false
    },
    methods: {
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray,

            })
        },
        //获取第一次请求的数量
        getCurrentStart() {
            return this.data.dataArray.length
        },
        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    nonoeResult: true
                })
            }
        },
        //判断是否还有更多数据
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false
            } else {
                return true
            }
        },
        //点击x号是清空当前搜索出来的数据，避免数据重复
        initialize() {
            this.setData({
                dataArray: [],
                nonoeResult: false,
                loading: false
            })
            this.data.total = null
        },
        isLocked() {
            return this.data.loading ? true : false
        },
        locked() {
            this.setData({
                loading: true
            })
        },
        unLocked() {
            this.setData({
                loading: false
            })
        },
    }

})
export { paginationBev }
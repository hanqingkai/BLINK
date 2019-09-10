import { KeywordModel } from "../../models/keyword";
import { BookModel } from "../../models/book";
import { paginationBev } from "../behaviors/pagination";


const keyWordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
    behaviors: [paginationBev],
    /**
     * 组件的属性列表
     */
    properties: {
        //添加热门搜索数据属性，从外部引入数据方式更优
        hotWords: {
            type: [],
            value: []
        },
        more: {
            type: Boolean,
            observer: 'loadMore'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        // hotWords: []
        //控制搜索结果的显示及隐藏
        searching: false,
        q: '',
        loading: false,
        loadingCenter: false
    },
    /**
     * 小程序初始化方法
     */
    attached() {
        const historyWords = keyWordModel.getHistory()
        this.setData({
                //es6 写法  两端相同可以只写一个
                historyWords
            })
            // keyWordModel.getHot().then(res => {
            //     // console.log(res)
            //     this.setData({
            //         hotWords: res.hot
            //     })
            // })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onCancel(e) {
            //暴露方法
            this.triggerEvent('cancel', {}, {})
            this.initialize()
        },
        onConfirm(e) {
            const q = e.detail.value || e.detail.text
            if (!q) {
                wx.showToast({
                    title: '请输入搜索内容',
                    icon: 'none'
                })
                return
            }

            this._showResult()
            this._showLoadingCenter()


            //实时显示搜索结果，可不添加
            this.data.historyWords.unshift(q)
            this.setData({
                historyWords: this.data.historyWords
            })
            bookModel.search(0, q).then(res => {
                this.setMoreData(res.books)
                this.setTotal(res.total)
                    // console.log(res)
                this.setData({
                    q
                })
                keyWordModel.addToHistory(q)
                this._hideLoadingCenter()
            })
        },
        onDelete(e) {
            this._closeResult()
            this.initialize()
        },
        loadMore() {
            if (!this.data.q) {
                return
            }
            if (this.isLocked()) {
                return
            }
            // console.log(123)
            //通过取初始数据条数来确定下一次请求的条数
            // const length = this.data.dataArray.length
            if (this.hasMore()) {
                this.locked()
                    // console.log("length=" + length)
                bookModel.search(this.getCurrentStart(), this.data.q)
                    .then(res => {
                        // console.log("newlength=" + res.books.length)
                        // const tempArray = this.data.dataArray.concat(res.books)
                        this.setMoreData(res.books)
                            // this.setData({
                            //     dataArray: tempArray,
                            // })
                        this.unLocked()
                    }, () => {
                        //请求失败也需要可以重新请求
                        this.unLocked()
                    })
            }
        },
        _showResult() {
            this.setData({
                searching: true
            })
        },
        _closeResult() {
            this.setData({
                searching: false,
                q: ''
            })
        },

        _showLoadingCenter() {
            this.setData({
                loadingCenter: true
            })
        },
        _hideLoadingCenter() {
            this.setData({
                loadingCenter: false
            })
        }
    }
})
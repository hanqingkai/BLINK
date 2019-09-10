// pages/book/book.js
import { BookModel } from '../../models/book'
const bookModel = new BookModel
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        searching: false,
        hotWords: [],
        more: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const hotList = bookModel.getHotList();
        hotList.then(
            res => {
                // console.log(res)
                this.setData({
                    books: res
                })
            }
        )

        bookModel.getHot().then(res => {
            // console.log(res)
            this.setData({
                hotWords: res.hot
            })
        })
    },
    onSearching(e) {
        this.setData({
            searching: true
        })
    },
    onCancel(e) {
        this.setData({
            searching: false
        })
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.setData({
            more: !this.data.more
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
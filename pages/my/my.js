import { BookModel } from "../../models/book";
import { ClassicModel } from "../../models/classic";

const bookMoudel = new BookModel()
const classicMoudel = new ClassicModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: '',
        bookCount: 0,
        classics: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.userAuthorized()
        this.getMyBookCount()
        this.getMyFavor()
    },
    getMyFavor() {
        classicMoudel.getMyFavor(res => {
            console.log(res)
            this.setData({
                classics: res
            })
        })
    },
    getMyBookCount() {
        bookMoudel.getMyBookCount().then(res => {
            // console.log(res)
            this.setData({
                bookCount: res.count
            })
        })
    },
    userAuthorized() {
        wx.getSetting({
            success: data => {
                if (data.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: data => {
                            // console.log(data.userInfo)
                            this.setData({
                                userInfo: data.userInfo,
                                authorized: true
                            })
                        }
                    })
                }
            }
        })
    },
    // getUserinfo(e) {
    //   console.log(e.detail)
    // },
    onGetUserInfo(e) {
        const userInfo = e.detail.userInfo
        console.log(e)
        if (userInfo) {
            this.setData({
                userInfo,
                authorized: true
            })
        }
    },
    onJumpToAbout(e) {
        wx.navigateTo({
            url: '/pages/about/about'
        })
    },
    onStudy(e) {
        wx.navigateTo({
            url: '/pages/course/course'
        })
    }

})
//behavior的功能，继承classicBeh 
import {
    classicBeh
} from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
    //可继承多个behavior
    behaviors: [classicBeh],
    properties: {
        src: String,
        title: String
    },
    /**
     * 组件的初始数据
     */
    data: {
        playing: false,
        playSrc: 'images/player@waitting.png',
        pauseSrc: 'images/player@playing.png'
    },
    attached: function(e) {
        this._recoverStatus()
        this._monitorSwitch()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlay: function(e) {
            if (!this.data.playing) {
                //图片切换
                this.setData({
                    playing: true
                })
                mMgr.src = this.properties.src;
                mMgr.title = this.properties.title
            } else {
                //图片切换
                this.setData({
                    playing: false
                })
                mMgr.pause()
            }

        },
        _recoverStatus: function() {
            if (mMgr.paused) {
                this.setData({
                    playing: false
                });
                return
            }
            if (mMgr.src == this.properties.src) {
                this.setData({
                    playing: true
                })
            }
        },
        _monitorSwitch: function() {
            mMgr.onPlay(() => {
                this._recoverStatus()
            })
            mMgr.onPause(() => {
                this._recoverStatus()
            })
            mMgr.onStop(() => {
                this._recoverStatus()
            })
            mMgr.onEnded(() => {
                this._recoverStatus()
            })
        }
    }
})
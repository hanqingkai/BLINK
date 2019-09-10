import { HTTP } from '../util/http'
let http = new HTTP()
class ClassicModel extends HTTP {
    getLatest(sCallback) {
        http.request({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res)
                this._setLatestIndex(res.index)
                    //不能确定最新数据 直接存储了，取不出来
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res)
            }
        })

    }
    getClassic(index, nextOrPrevious, sCallback) {
        //缓存中寻找or api 写入缓存
        //key 确定key  找到当前下标获取缓存中对应数据
        let key = nextOrPrevious == 'next' ? this._getKey(index + 1) :
            this._getKey(index - 1);
        let classic = wx.getStorageSync(key);
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    //新获取到的数据存入缓存
                    wx.setStorageSync(this._getKey(res.index), res)
                    sCallback(res)
                }
            })
        } else {
            sCallback(classic);
        }

    }

    isFirst(index) {
        return index == 1 ? true : false
    }
    isLatest(index) {
            let latestIndex = this._getLatestIndex()
            return latestIndex == index ? true : false
        }
        //存储下标值 用于和最近的期刊下标进行对比
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index;
    }
    _getKey(index) {
        let key = 'classic-' + index
        return key;
    }
    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }
}

export { ClassicModel }
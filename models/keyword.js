 class KeywordModel {
     key = 'q'
     maxLength = 10
     getHistory() {

         const words = wx.getStorageSync(this.key)
         if (!words) {
             return []
         }
         return words
     }
     addToHistory(keyword) {
         let words = this.getHistory()
         const has = words.includes(keyword)
         if (!has) {
             //删除数组末尾元素  keyword放在数组第一位
             const length = words.length
                 //设置数组最大值避免全部搜索都存入缓存
             if (length >= this.maxLength) {
                 words.pop()
             }
             words.unshift(keyword)
             wx.setStorageSync(this.key, words)
         }
     }

 }

 export { KeywordModel }
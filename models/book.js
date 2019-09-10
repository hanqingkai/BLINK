import { HTTP } from '../util/http-p'
class BookModel extends HTTP {
    getHotList() {
        return this.request({ //注意解构用法
            url: 'book/hot_list',
            // data: {
            //     name: 1,
            //     age: 18
            // },
            // method: 'POST'
        })
    }

    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`,
        })
    }

    getLikeStatus(bid) {
        return this.request({
            url: `/book/${bid}/favor`,
        })
    }

    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }

    getMyBookCount() {
        return this.request({ url: '/book/favor/count' })
    }
    postComment(bid, comment) {
            return this.request({
                url: 'book/add/short_comment',
                method: 'POST',
                data: {
                    book_id: bid,
                    content: comment
                }

            })
        }
        /*
         * 获取热门搜索
         */
    getHot() {
        return this.request({
            url: '/book/hot_keyword'
        })
    }
    search(start, q) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                q: q,
                start: start
            }
        })
    }
}
export { BookModel }
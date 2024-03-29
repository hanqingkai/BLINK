import { HTTP } from '../util/http.js'
class LikeModel extends HTTP {
    getClassicLikeStatus(cid, type, success) {
        this.request({
            url: `classic/${type}/${cid}/favor`,
            success: success
        })
    }
    getBookLikeStatus(bid, type, success) {
        this.request({
            url: `book/${type}/${bid}/favor`
        })
    }

    like(behavior, artId, category) {
        let url = behavior == 'like' ? 'like' : 'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artId,
                type: category
            }
        })
    }
}
export { LikeModel }
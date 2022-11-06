const Comment = require('./comment')

class Video {
    constructor(owner, title) {
        this.owner = owner
        this.title = title
        this.comments = {} // userId_CommentId : { commentObj }
        this.views = 0
        this.likes = {}
        this.dislikes = {}
    }

    addComment(user, comment) {
        const key = `${user.username}_${comment.id}`
        this.comments[key] = comment
    }

    deleteComment(user, commentId) {
        const key = `${user.username}_${commentId}`
        delete this.comments[key]
    }

    getViews() {
        return this.views
    }

    likeDislike(user, action) {
        if (action === 'like') {
            if (this.dislikes[user.username]) this.dislikes[user.username] = 0
            this.likes[user.username] = 1
        } else {
            if (this.likes[user.username]) this.likes[user.username] = 0
            this.dislikes[user.username] = 1
        }
    }

    totalLikesDislikes() {
        return { 
            likes: Object.values(this.likes).filter(recordStatus => recordStatus === 1).length,
            dislikes: Object.values(this.dislikes).filter(recordStatus => recordStatus === 1).length
        }
    }

    getComments() {
        return this.comments
    }

}

module.exports = Video

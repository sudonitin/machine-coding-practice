const Video = require('./video')

class YouTube {
    constructor() {
        this.videos = []
    }

    searchVideo(title) {
        return this.videos.filter(video => video.title.indexOf(title) > 0)

    }

    watchVideo(video) {
        video.views += 1
    }

    uploadVideo(owner, video) {
        const newVideo = new Video(owner, video)
        this.videos.push(newVideo)
        return newVideo
    }
}

module.exports = YouTube

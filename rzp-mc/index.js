const VideoDirectory = require('./youtube')
const User = require('./user')
const Video = require('./video')

const YouTube = new VideoDirectory()
const nitin = new User('nitin')
const jatin = new User('jatin')

const jsVideo = YouTube.uploadVideo(nitin, 'js tutorial')
const pythonVideo = YouTube.uploadVideo(nitin, 'python tutorial')
const cVideo = YouTube.uploadVideo(nitin, 'c tutorial')
const cppVideo = YouTube.uploadVideo(nitin, 'cpp tutorial')

const searchResults = YouTube.searchVideo('tutorial')
// console.log(searchResults)

const video = searchResults[0]
// YouTube.watchVideo(video)
// YouTube.watchVideo(searchResults[1])
// YouTube.watchVideo(searchResults[2])
// YouTube.watchVideo(searchResults[1])

// console.log('All views of all videos', YouTube.searchVideo('tutorial'))

// console.log('total views', video.getViews())

// jsVideo.addComment(nitin, {id: 1, comment: 'great !'})
// jsVideo.addComment(nitin, {id: 2, comment: 'bad !'})
// jsVideo.addComment(nitin, {id: 3, comment: 'kkkk !'})
// jsVideo.deleteComment(nitin, 1)
// console.log(jsVideo.getComments())


jsVideo.likeDislike(nitin, 'like')
jsVideo.likeDislike(jatin, 'like')
jsVideo.likeDislike(nitin, 'dislike')
console.log(jsVideo.totalLikesDislikes())

console.log('Total Likes & dislikes', video.totalLikesDislikes())

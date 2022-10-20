const Option = require('./option')

class Question {
    constructor(title, options = []) {
        this.title = title
        this.options = this.createOptions(options)
    }

    createOptions(options) {
        return options.map(({title, weightage}) => new Option(title, weightage))
    }

    findOption(title) {
        return this.options.filter(option => option.title == title)[0]
    }
}

module.exports = Question
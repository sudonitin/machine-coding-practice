const Question = require('./question')

class Survey {
    constructor(user, name) {
        this.owner = user
        this.name = name
        this.questions = []
        this.questionRating = {} // { question: [all users response' option's weights] }
        this.userResponseRatings = {} // { user: rating }
    }

    createQuestionsWithOptions(questions) {
        this.questions = questions.map(({ title, options }) => new Question(title, options))
    }

    /*
        responses = [{ Question: QuestionObj, option: OptionObj }]
    */
    submitResponse(user, responses = []) {
        if (this.userResponseRatings[user.name]) throw `${user.name} already submitted response for survey`
        responses = this.userResponseToQuestionOptionObj(responses)
        this.userResponseRatings[user.name] = (responses.reduce((prev, next) => prev + next.option.weightage, 0)) / responses.length

    }

    userResponseToQuestionOptionObj(responses = []) {
        return responses.map(({ question, option }) => {
            const questionObj = this.findQuestionByTitle(question)
            const optionObj = questionObj.findOption(option)
            if (!this.questionRating[questionObj.title]) this.questionRating[questionObj.title] = []
            this.questionRating[questionObj.title].push(optionObj.weightage)
            return { question: questionObj, option: optionObj }
        })
    }

    findQuestionByTitle(title) {
        return this.questions.filter(question => question.title === title)[0]
    }

    calculateOverAllRating() {
        return Object.values(this.userResponseRatings).reduce((prev, next) => prev + next, 0) / Object.keys(this.userResponseRatings).length
    }

    calculateQuestionWiseRating() {
        const result = {}
        for(const question in this.questionRating) {
            result[question] = this.questionRating[question].reduce((prev, nxt) => prev + nxt, 0) / this.questionRating[question].length
        }
        return result
    }

}

module.exports = Survey

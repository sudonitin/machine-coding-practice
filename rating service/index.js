const User = require('./user')
const Survey = require('./survey')
const enums = require('./enumConstants')
const { questions, responses } = require('./data')
const { executeAction } = require('./authorization_middleware')

const nitin = new User('nitin', enums.userRole.User)
const jatin = new User('jatin', enums.userRole.User)
const admin = new User('admin', enums.userRole.Admin)

const survey1 = executeAction(admin, 'CREATE_SURVEY', () => new Survey(admin, 'interview'))
executeAction(admin, 'CREATE_QUESTIONS', () => survey1.createQuestionsWithOptions(questions))

executeAction(nitin, 'SUBMIT_SURVEY', () => survey1.submitResponse(nitin, responses.nitin))
executeAction(jatin, 'SUBMIT_SURVEY', () => survey1.submitResponse(jatin, responses.jatin))
console.log('Overall survey rating', survey1.calculateOverAllRating())
console.log('Overall question rating', survey1.calculateQuestionWiseRating())
// executeAction(jatin, 'SUBMIT_SURVEY', () => survey1.submitResponse(jatin, responses.jatin))

const enumConstants = {
    userRole: {
        Admin: 'Admin',
        User: 'User'
    },
    rolePermissions: {
        Admin: {
            CREATE_SURVEY: 'CREATE_SURVEY',
            CREATE_QUESTIONS: 'CREATE_QUESTIONS',
            CREATE_OPTIONS: 'CREATE_OPTIONS',
            UPDATE_SURVEY: 'UPDATE_SURVEY',
            UPDATE_QUESTIONS: 'UPDATE_QUESTIONS',
            UPDATE_OPTIONS: 'UPDATE_OPTIONS',
            GET_SURVEY_RATINGS: 'GET_SURVEY_RATINGS',
            SUBMIT_SURVEY: 'SUBMIT_SURVEY'
        },
        User: {
            SUBMIT_SURVEY: 'SUBMIT_SURVEY'
        }
    }
}

module.exports = enumConstants
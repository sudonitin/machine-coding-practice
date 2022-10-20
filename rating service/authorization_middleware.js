const rolePermissions = require('./enumConstants').rolePermissions

const isUserAuthorizedForAction = (user, actionType) => rolePermissions[[user.role]][actionType]

const executeAction = (user, actionType, action) => {
    if (isUserAuthorizedForAction(user, actionType)) {
        return action()
    }
    throw `!!!! Permission denied for performing ${actionType} for ${user.name} !!!`
}

module.exports = {
    isUserAuthorizedForAction,
    executeAction
}
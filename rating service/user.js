// if userId comes as requirement, we would need userTable for that i.e. table.js is needed
module.exports = class User {
    constructor(name, role) {
        this.name = name
        this.role = role
    }
}
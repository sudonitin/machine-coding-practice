const Database = require('./database')

const sandboxDb = new Database('sandbox')
sandboxDb.createTable('user', { id: 'Number', name: 'String' })

const userTable = sandboxDb.getTable('user')
userTable.insertRows([{ name: 'Nitin' }, { name: 'Jatin' }])

console.log(userTable.findValues({ name: 'Nitin' }))
console.log(userTable.displayFullTable('user'))

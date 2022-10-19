const Database = require('./database')

const sandboxDb = new Database('sandbox')
sandboxDb.createTable('user', { id: 'Number', name: 'String' })

const userTable = sandboxDb.getTable('user')
userTable.insertRows([{ name: 'Nitin' }, { name: 'Jatin' }])

console.log(userTable.findValues({ name: 'Nitin' }))
console.log(userTable.displayFullTable('user'))

userTable.updateRows({ name: 'Nitin' }, { name: 'Nitin Sahu' })
console.log(userTable.displayFullTable('user'))

// userTable.deleteRows({ id: 2 })
// console.log(userTable.displayFullTable('user'))

userTable.createIndexOnColumn('name')
console.log(userTable.findValues({ id: 2 }))
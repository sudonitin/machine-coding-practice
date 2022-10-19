const Database = require('./database')

const sandboxDb = new Database('sandbox')
sandboxDb.createTable('user', { id: { type: 'Number', isPrimaryKey: true, isAutoIncrement: true }, name: { type: 'String' } })
sandboxDb.createTable('student', { rollNo: { type: 'Number', isPrimaryKey: true, isAutoIncrement: true }, name: { type: 'String' } })

const userTable = sandboxDb.getTable('user')
userTable.insertRows([{ name: 'Nitin' }, { name: 'Jatin' }])


console.log(sandboxDb.displayRows('user'))

/*
It should be possible to create/truncate/delete tables in a database. - done
It should be possible to filter and display records whose column values match a given value. - done
The supported column types are string and int and should be extendable for other column types.
It should be possible to insert records in a table. - done
It should be possible to print all records in a table. - done
*/
const Table = require('./table')

class Database {
    databaseTableMap = {}
    constructor(databaseName) {
        this.databaseTableMap[databaseName] = []
        this.currentDatabase = this.databaseTableMap[databaseName]
    }

    getAllTablesInDatabase() {
        return Object.keys(this.currentDatabase)
    }

    createTable(tableName, columns = {}) {
        this.currentDatabase[tableName] = new Table(tableName, columns)
        return `${tableName} created successfully!, ${JSON.stringify(this.currentDatabase[tableName])}`
    }

    dropTable(tableName) {
        delete this.currentDatabase[tableName]
        return `${tableName} table deleted successfully!`
    }

    truncateTable(tableName) {
        this.currentDatabase[tableName] = []
        return `${tableName} truncated successfully!`
    }

    checkIfTableExists(tableName) {
        return this.currentDatabase[tableName]
    }

    insertRowsInTable(tableName, rows) {
        this.currentDatabase[tableName].insertRows(rows)
    }

    findRowsByWhereClauseInTable(tableName, whereClause) {
        return this.currentDatabase[tableName].findValues(whereClause)
    }

    getTable(tableName) {
        return this.currentDatabase[tableName]
    }
}

module.exports = Database;

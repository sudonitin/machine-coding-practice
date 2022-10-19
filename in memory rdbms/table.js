const Column = require('./column')

class Table {
    constructor(tableName, columns) {
        this.tableName = tableName
        this.columns = this.createColumns(columns)
        this.rows = []
        this.incrementId = 1
    }
    
    createColumns(columns) {
        Object.keys(columns).map(columnName => new Column(columnName, columns[columnName]))
        return columns
    }

    insertRows(rows) {
        for (const row of rows) {
            this.rows.push({ id: this.incrementId, ...row })
            this.incrementId += 1
        }
    }

    findValues(whereClause) {
        if (whereClause === {}) return this.rows
        return this.rows.filter(row => {
            for (const column in whereClause) {
                if (!this.columns[column]) throw `${column} does not exist in ${this.tableName}`
                if (row[[column]] !== whereClause[column]) return false
            }
            return true
        })
    }

    truncate() {
        this.rows = []
    }

    displayFullTable() {
        return this.rows
    }
}

module.exports = Table
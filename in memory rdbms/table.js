const Column = require('./column')

const validatePrimaryKey = (columns) => {
    return Object.keys(columns).filter((column) => column[isPrimaryKey] === true).length == 1
}
class Table {
    constructor(tableName, columns) {
        this.tableName = tableName
        this.columns = this.createColumns(columns)
        this.rows = []
        this.incrementId = 1
    }
    
    createColumns(columns) {
        if (!validatePrimaryKey(columns)) throw `A table cannot have multiple or no primary keys`
        return Object.keys(columns).map(columnName => {
            const col = new Column(columnName, columns[columnName])
            if (col.isPrimary) this.primaryKey = col
            return col
        })
    }

    insertRows(rows) {
        for (const row of rows) {
            this.rows.push({ [this.primaryKey.colummName]: this.incrementId, ...row })
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
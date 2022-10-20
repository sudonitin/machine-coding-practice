const Column = require('./column')
const Row = require('./row')

class Table {
    constructor(tableName, columns) {
        this.tableName = tableName
        this.columns = this.createColumns(columns)
        this.rows = []
        this.incrementId = 1
        this.indices = {}
    }
    
    createColumns(columns) {
        const columnsMap = {}
        Object.keys(columns).forEach(columnName => {
            columnsMap[columnName] = new Column(columnName, columns[columnName])
        })
        return columnsMap
    }

    insertRows(rows) {
        for (const row of rows) {
            this.rows.push(new Row({ id: this.incrementId, ...row}))
            this.incrementId += 1
        }
        console.log(`${rows.length} records inserted!`)
    }

    updateRows(whereClause, newData) {
        const rowsToUpdate = this.findValues(whereClause)
        rowsToUpdate.forEach(row => {
            row.columnData = { ...row.columnData, ...newData }
        })
        // update index as well as in js we are not storing the reference of row
        console.log(`${rowsToUpdate.length} rows updated`)
    }

    deleteRows(whereClause) {
        const rowsToDelete = this.findValues(whereClause)
        console.log('delete rows', rowsToDelete)
        rowsToDelete.forEach(row => {
            row.isDeleted = 1
        })
        console.log(`${rowsToDelete.length} rows deleted`)
    }

    findValues(whereClause) {
        if (whereClause === {}) return this.rows
        const resultInIndex = this.findInIndex(whereClause)
        if (resultInIndex) return resultInIndex
        return this.rows.filter(row => {
            for (const column in whereClause) {
                if (!this.columns[column]) throw `${column} does not exist in ${this.tableName}`
                if (row.columnData[[column]] !== whereClause[column]) return false
            }
            return true
        })
    }

    findInIndex(whereClause) {
        for (const column in whereClause) {
            if (this.indices[[column]] && this.indices[[column]][whereClause[column]]) return this.indices[[column]][whereClause[column]]
        }
    }

    truncate() {
        this.rows = []
    }

    displayFullTable() {
        console.log(`-------------- Records of ${this.tableName} ---------------`)
        return this.rows.filter(row => !row.isDeleted)
    }

    createIndexOnColumn(column) {
        this.indices[column] = {}
        this.rows.forEach(row => {
            this.indices[column][[row.columnData[[column]]]] = row
        })
        console.log(`======== Index Created!  ========`)
        console.log(this.indices[column])
    }
}

module.exports = Table
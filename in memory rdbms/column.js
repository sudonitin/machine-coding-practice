class Column{
    allowedColumnTypes = ['String', 'Number']
    constructor(colummName, columnType) {
        if (this.isValidColumnType(columnType)) {
            this.colummName = colummName
            this.columnType = columnType
        } else throw `Illegal columnType:: ${columnType}`
    }
    isValidColumnType(columnType) {
        return this.allowedColumnTypes.includes(columnType) ? columnType : false
    }
}

module.exports = Column
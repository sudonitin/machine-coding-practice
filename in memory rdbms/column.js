class Column{
    dataTypesEnum = {
        String: 'String',
        Number: 'Number'
    }
    constructor(colummName, { dataType, isPrimary = false, isAutoIncrement = false }) {
        if (this.isValiddataType(dataType)) {
            this.colummName = colummName
            this.dataType = dataType
            this.isPrimary = isPrimary
            this.isAutoIncrement = isAutoIncrement
        } else throw `Illegal dataType:: ${dataType}`
    }
    isValiddataType(dataType) {
        return this.dataTypesEnum.includes(dataType) ? dataType : false
    }
}

module.exports = Column
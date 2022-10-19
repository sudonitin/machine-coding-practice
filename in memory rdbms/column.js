const dataTypesEnum = {
    String: 'String',
    Number: 'Number'
}
class Column{
    constructor(colummName, dataType) {
        if (this.isValiddataType(dataType)) {
            this.colummName = colummName
            this.dataType = dataType
        } else throw `Illegal dataType:: ${dataType}`
    }
    isValiddataType(dataType) {
        return dataTypesEnum[dataType] ? dataType : false
    }
}

module.exports = Column
export default class TabulatorFilter{
    constructor({id, field, type, value}) {
        this.field = field;
        this.value = value;
        this.type = type;
        this.id = id;
    }
}
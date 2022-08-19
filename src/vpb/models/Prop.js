export default class Prop{
    constructor({type,label,defaultValue,items}) {
        this.type = type;
        this.label = label;
        this.default = defaultValue;
        this.items = items || null;
    }
}
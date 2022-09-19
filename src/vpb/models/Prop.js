export default class Prop{
    constructor({type,label,defaultValue,items,name}) {
        this.name = name
        this.type = type;
        this.label = label;
        this.default = defaultValue;
        this.items = items || null;
    }
}
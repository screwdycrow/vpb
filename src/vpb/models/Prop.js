export default class Prop{
    constructor({type,label,defaultValue,name, group}) {
        this.name = name
        this.type = type;
        this.label = label;
        this.group =  group || 'default';
        this.default = defaultValue;
    }
}
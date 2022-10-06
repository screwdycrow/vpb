export default class Prop{
    constructor({type,label,defaultValue,name,group,tab}) {
        this.name = name
        this.type = type;
        this.label = label;
        this.group =  group || 'Default';
        this.tab = tab || 'Main'
        this.default = defaultValue;
    }
}
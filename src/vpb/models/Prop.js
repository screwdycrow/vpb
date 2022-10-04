export default class Prop{
    constructor({type,label,defaultValue,name,group,tab}) {
        this.name = name
        this.type = type;
        this.label = label;
        this.group =  group || 'default';
        this.tab = tab || 'default'
        this.default = defaultValue;
    }
}
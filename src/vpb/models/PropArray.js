import Prop from "@/vpb/models/Prop";

export default class PropArray extends Prop{
    constructor({label,defaultValue,name,allowAdd, arrayType, inline}) {
        super({type:'array',label, defaultValue, name});
        this.allowAdd = allowAdd || false;
        this.inline = inline || false
        this.arrayType = arrayType || 'text'
    }
}
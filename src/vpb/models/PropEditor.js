import {markRaw} from "vue";

export default class PropEditor{
    constructor({type,label, definition}) {
        this.type = type;
        this.label = label;
        this.definition = markRaw(definition)
    }
}
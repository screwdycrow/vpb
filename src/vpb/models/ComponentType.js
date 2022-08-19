import Prop from "@/vpb/models/Prop";

export default class ComponentType {
    constructor({type, name, icon, description, props, definition}) {
        this.type = type;
        this.name = name;
        this.icon = icon;
        this.description = description;
        this.definition = definition;
        this.props = props.map(p => new Prop(p))
    }
}
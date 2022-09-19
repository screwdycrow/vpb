import Prop from "@/vpb/models/Prop";

export default class ComponentType {
    constructor({type, name, icon, description, props, definition, isRenderer}) {
        this.type = type;
        this.label = name;
        this.icon = icon;
        this.isRenderer = isRenderer;
        this.description = description;
        this.definition = definition;
        this.props = new Map();
        if (props) props.forEach(p => this.props.set(p.name, p))
    }
}
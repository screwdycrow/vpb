import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {toRefs} from "vue";

export default class Component{
    constructor({componentType,id,parent,order,props}){
        this.componentType = componentType;
        this.id = id;
        this.parent = parent;
        this.props = props;
        this.order = order;
    }
}
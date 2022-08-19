import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

export default class Component{
    constructor({componentType, props}){
        this.componentType = componentType;
        this.props = props;
    }
    getComponentClass(){
        const vpbAdmin =  useVpbAdminStore()
    }


}
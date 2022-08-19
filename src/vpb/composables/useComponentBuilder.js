import {ref, onMounted, onUnmounted} from "vue";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

export function useComponentBuilder(){
    const vpbAdminStore = useVpbAdminStore();
    function getComponentDefinition(parent, name){
    }
}
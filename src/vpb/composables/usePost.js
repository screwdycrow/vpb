import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {toRefs} from "vue";

export function usePost(props, ctx) {
    const vpbAdminStore = useVpbAdminStore();
    const {name} = toRefs(props);
    const getPostContent  = () => {
        return  vpbAdminStore.posts[this.posts.findIndex(p => p.name === name)];
    }

}
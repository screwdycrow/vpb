import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {computed, ref, toRefs} from "vue";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import {storeToRefs} from "pinia";

export function usePost(name) {
    const vpbAdminStore = useVpbAdminStore()
    const {activePost}= storeToRefs(useVpbEditorStore());
    const post  = computed(()=>vpbAdminStore.postOfName(name))
    const isEditMode = computed(()=>activePost.name === name)
    return {post,isEditMode,activePost}
}


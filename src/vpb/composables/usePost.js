import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {computed, onUnmounted, ref, toRefs} from "vue";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import {storeToRefs} from "pinia";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";

export function usePost(name) {
    const vpbAdminStore = useVpbAdminStore()
    const vpbEditor = useVpbEditorStore()
    const {activePost} = storeToRefs(vpbEditor);

    const post = computed(() => {
        return vpbAdminStore.postOfName(name)
    })
    const isEditMode = computed(() => {
        if (activePost.value !== null) {
            return activePost.value.name === name
        } else {
            return false;
        }
    })

    return {post, isEditMode, activePost}
}


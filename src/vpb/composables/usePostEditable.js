import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import {onUnmounted} from "vue";

export default function usePostEditable(post) {
    const editorStore = useVpbEditorStore();
    const setAsEditable = () => {
        editorStore.setEditablePost(post);
    }
    const unsetFromEditable = () => {
        editorStore.unsetEditablePost(post);
    }
    setAsEditable();
    onUnmounted(() => {
        unsetFromEditable();
    })
}
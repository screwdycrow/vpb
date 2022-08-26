//usePostEditor vue composable
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {computed, ref, toRefs} from "vue";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import {storeToRefs} from "pinia";

export default function usePostEditor(){
    const adminStore = useVpbAdminStore();
    const editorStore = useVpbEditorStore();
    const { editablePosts, activePost, isEditorActive} = storeToRefs(editorStore);

    const setSelectedActive = (name)=>{
        //get post from adminStore by name
        const post =  adminStore.postOfName(name);
        console.log(post);
        editorStore.setActivePost(post);
    }
    const cancelChanges = ()=>{
        adminStore.updatePost(activePostCopy.value);
        editorStore.resetEditor();
    }
    const saveChanges = ()=>{
        adminStore.updatePost(activePost.value);
    }

    return {
        isEditorActive,
        editablePosts,
        activePost,
        saveChanges,
        cancelChanges,
        setSelectedActive,
    }


}
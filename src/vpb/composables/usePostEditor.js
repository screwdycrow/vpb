//usePostEditor vue composable
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {computed, ref, toRefs} from "vue";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import {storeToRefs} from "pinia";

export default function usePostEditor(){
    const adminStore = useVpbAdminStore();
    const editorStore = useVpbEditorStore();
    const { editablePosts, activePost, isEditorActive, isDragging, dragging, activeRendererAdd} = storeToRefs(editorStore);

    const setSelectedActive = (name)=>{
        //get post from adminStore by name
        const post =  adminStore.postOfName(name);
        editorStore.setActivePost(post);
    }
    const cancelChanges = ()=>{
        adminStore.updatePost(activePostCopy.value);
        editorStore.resetEditor();
    }
    const saveChanges = ()=>{
        adminStore.updatePost(activePost.value);
    }
    const addComponent = (type,parent,index) =>{
        editorStore.addComponent(type,parent,index)
    }
    const onComponentTypeDrop = (evt, parent)=>{
        const type = evt.dataTransfer.getData('type')
        addComponent(type,parent,1);
    }

    return {
        isEditorActive,
        editablePosts,
        activePost,
        saveChanges,
        cancelChanges,
        dragging,
        setSelectedActive,
        activeRendererAdd,
        setActiveRenderAdd :editorStore.setActiveRenderAdd,
        onComponentTypeDrop
    }


}
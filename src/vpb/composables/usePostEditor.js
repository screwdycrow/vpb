//usePostEditor vue composable
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {computed, ref, toRefs} from "vue";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import {storeToRefs} from "pinia";

export default function usePostEditor(){
    const adminStore = useVpbAdminStore();
    const editorStore = useVpbEditorStore();
    const { editablePosts,
        activePost,
        isEditorActive,
        activePostCopy,
        dragging,
        activeComponent,
        activeRendererAdd,
    } = storeToRefs(editorStore);

    const setSelectedActive = (name)=>{
        const post =  adminStore.postOfName(name);
        editorStore.setActivePost(post);
    }
    const cancelChanges = ()=>{
        adminStore.updatePost(activePostCopy.value);
        editorStore.resetEditor();
    }
    const saveChanges = ()=>{
        adminStore.updatePost(activePost.value);
        editorStore.setActivePost(activePost.value)
        editorStore.setEditablePost(activePost.value)
        editorStore.setActiveComponent(null);

    }
    const addComponent = (type,parent,index) =>{
        editorStore.addComponent(type,parent,index)
    }
    const removeComponent = (component) =>{
        editorStore.removeComponent(component)
    }
    const onComponentTypeDrop = (evt, parent,index)=>{
        const type = evt.dataTransfer.getData('type')
        addComponent(type,parent,index);
    }
    const onComponentDrop = (evt, droppedIntoId, parent, index)=>{
        const component = JSON.parse(evt.dataTransfer.getData('component'))
        if(component.id === droppedIntoId) return;
        editorStore.moveComponent(component,parent, index);
    }
    const onComponentClick= (evt,component,isRenderer)=>{
        if(!isRenderer) evt.stopPropagation()
        editorStore.setActiveComponent(component)
    }
    const resetActiveComponent = ()=>{
        editorStore.setActiveComponent(null);
    }

    return {
        resetActiveComponent,
        removeComponent,
        isEditorActive,
        editablePosts,
        activePost,
        activeComponent,
        saveChanges,
        cancelChanges,
        dragging,
        setSelectedActive,
        activeRendererAdd,
        setActiveRenderAdd :editorStore.setActiveRenderAdd,
        onComponentTypeDrop,
        onComponentClick,
        onComponentDrop
    }


}
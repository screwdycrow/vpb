<template>
  <div class="component-content rounded"
       :class="{'edit-mode-component':isEditMode,'droppable':isRenderer && dragging!==null}"
       :draggable="isEditMode"
       @click="onComponentClick($event, component,isRenderer)"
       @dragenter.prevent="onDragEnter($event,component)"
       @dragleave.prevent="onDragLeave($event,component)"
       @drop="resetDragLeave($event, component)"
       @dragover.prevent
       @dragstart.self="onComponentDrag($event, component)"
       @dragend.self="onComponentDragEnd($event, component)">
    <div class="component-header flex">
      <div class="component-title">
        {{ component.componentType }}
      </div>
    </div>
    <component :is="componentClass"
               :id="component.id"
               v-bind="{children:children, postName:postName,isEditMode:isEditMode,...component.props}"
               :key="component.id">
    </component>
    <div class="editor" v-if="(dragging && isRenderer && dragLeave > 0 )">
      <vpb-add-component :id="component.id"></vpb-add-component>
    </div>
  </div>
</template>

<script>
import {computed, ref, toRefs} from "vue";
import {storeToRefs} from "pinia";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import usePostEditor from "@/vpb/composables/usePostEditor";
import VpbAddComponent from "@/vpb/components/pagebuilder/VpbAddComponent";

export default {
  components: {VpbAddComponent},
  props: {
    postName: String,
    component: Object,
  },
  name: "VpbComponent",
  setup(props, ctx) {
    const {component, postName} = toRefs(props);
    const editor = usePostEditor();
    const editorStore = useVpbEditorStore();
    const adminStore = useVpbAdminStore();
    let dragLeave = ref(0);

    const {activePost, dragging} = toRefs(editor)

    const isEditMode = computed(() => {
      if (activePost.value === null) return false;
      console.log(activePost.value.name, postName.value)
      return activePost.value.name === postName.value
    })

    const componentType = computed(() => {
      return adminStore.componentTypeOf(component.value.componentType)
    })

    const children = computed(() => {
          let post = !isEditMode.value ? editorStore.editablePosts.get(postName.value) : activePost;
          let children = []
          if (post.value.content[component.value.id] !== undefined) {
            children = post.value.content[component.value.id]
          }
          return children
        }
    )

    const onComponentDrag = (evt, component) => {
      if (!isEditMode) return;
      evt.dataTransfer.setData('component', JSON.stringify(component))
      editorStore.setDragging('component');
    }
    const onComponentDragEnd = (evt, component) => {
      if (!isEditMode) return;
      editorStore.setDragging(null);
    }
    const onDragLeave = (evt, component) => {
      if (!isEditMode) return;
      dragLeave.value--;
    }
    const onDragEnter = (evt, component) => {
      if (!isEditMode) return;
      dragLeave.value++
    }
    const resetDragLeave = (evt, component) => {
      if (!isEditMode) return;
      dragLeave.value = 0
    }
    return {
      isRenderer: componentType.value.isRenderer,
      onComponentClick: editor.onComponentClick,
      componentClass: componentType.value.definition,
      postName,
      component,
      children,
      dragging,
      isEditMode,
      dragLeave,
      onDragLeave,
      onDragEnter,
      onComponentDrag,
      onComponentDragEnd,
      resetDragLeave
    }
  }
}
</script>

<style scoped>
.edit-mode-component {
  margin: 5px;
  border: 1px solid #cad4e0;
  padding: 2px;
}

.component-title {
  color: #cad4e0;
  font-size: 0.8em;
}

.edit-mode-component:hover {
  border: 2px solid #6fc2f1;
}

.edit-mode-component:hover {
  border: 2px solid #6fc2f1;
}

.droppable {
  border: 2px solid #6fc2f1;

}

/*.component-content:hover > .dropzone{*/
/*   background: #6fc2f1;*/
/*   padding:5px;*/
/* }*/
</style>
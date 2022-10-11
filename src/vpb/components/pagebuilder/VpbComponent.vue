<template>
  <div class="component-content rounded"
       :class="{'edit-mode-component':isEditMode,'droppable':isRenderer && dragging!==null}"
       :draggable="isEditMode"
       @click="onClick($event, component,isRenderer)"
       @dragenter.prevent="onDragEnter($event,component)"
       @dragleave.prevent="onDragLeave($event,component)"
       @drop="onDrop($event)"
       @mouseover.stop
       @dragover.prevent
       @dragstart.self="onComponentDrag($event, component)"
       @dragend.self="onComponentDragEnd($event, component)">
    <div class="component-header flex justify-between" v-if="isEditMode">
      <div class="component-title">
        {{ component.componentType }}
      </div>
      <button @click="remove(component)" class="hover:bg-gray-300 text-white font-bold py-1 px-1 rounded-full">
        <svg class="h-3 w-3 fill-current text-gray-300" viewBox="0 0 24 24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
    </div>
    <component :is="componentClass"
               :id="component.id"
               v-bind="{children:children, postName:postName,isEditMode:isEditMode,...component.props}"
               :key="component.id">
    </component>
    <div class="editor" v-if="(dragging && isRenderer && dragLeave > 0 && !dragSelf )">
      <vpb-add-component @addedComponent="resetDragLeave($event)" :index="index" :id="component.id"></vpb-add-component>
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
import {cloneDeep} from "lodash";

export default {
  components: {VpbAddComponent},
  props: {
    postName: String,
    component: Object,
    index: Number
  },
  name: "VpbComponent",

  setup(props, ctx) {
    const {component, postName, index} = toRefs(props);
    const editor = usePostEditor();
    const editorStore = useVpbEditorStore();
    const adminStore = useVpbAdminStore();
    let dragLeave = ref(0);
    let dragSelf = ref(false);
    const {activePost, dragging} = toRefs(editor)

    const isEditMode = computed(() => {
      if (activePost.value === null) return false;
      return activePost.value.name === postName.value
    })

    const componentType = computed(() => {
      return adminStore.componentTypeOf(component.value.componentType)
    })
    const post = computed(() => {
      return !isEditMode.value ? editorStore.editablePosts.get(postName.value) : activePost.value;

    })
    const children = computed(() => {
          let children = []
          if (post.value.content[component.value.id] !== undefined) {
            children = post.value.content[component.value.id]
          }
          return children
        }
    )
    const fixComponent = () => {
      let componentProps = Object.keys(component.value.props);
      let componentTypeProps = componentType.value.props;
      if (component.value.props) {
        //find the difference of component props and component type props
        componentProps
            .filter(x => !componentTypeProps.has(x))
            .forEach(x => {
              delete component.value.props[x]
            })
      }
      //find the difference of component type props and component props
      Array.from(componentTypeProps.values())
          .filter(x => !component.value.props.hasOwnProperty(x.name))
          .forEach(x => {
            component.value.props[x.name] = typeof componentTypeProps.get(x.name).defaultValue === "object"? cloneDeep(componentTypeProps.get(x.name).defaultValue): componentTypeProps.get(x.name).defaultValue
          })
    }
    fixComponent();
    const onComponentDrag = (evt, component) => {
      if (!isEditMode.value) return;
      dragSelf.value = true;
      evt.dataTransfer.setData('component', JSON.stringify(component))
      editorStore.setDragging('component');
    }
    const onComponentDragEnd = (evt, component) => {
      resetDragLeave();
      if (!isEditMode.value) return;
      dragSelf.value = false;
      editorStore.setDragging(null);
    }
    const onDragLeave = (evt, component) => {
      if (!isEditMode.value) return;
      dragLeave.value--;
    }
    const onDragEnter = (evt, component) => {
      if (!isEditMode.value) return;
      dragLeave.value++
    }
    const resetDragLeave = () => {
      if (!isEditMode.value) return;
      dragLeave.value = 0
    }
    const remove = (component) => {
      editor.removeComponent(component);
    }
    const onClick = (evt, component, isRenderer) => {
      if (!isEditMode.value) return;
      evt.stopPropagation();
      editor.onComponentClick(evt, component, isRenderer);
    }
    const onDrop = (evt) => {
      resetDragLeave()
      if (!isEditMode.value) return;
      evt.stopPropagation();
      dragLeave.value = 0;
      if (dragging.value === 'component') {
        editor.onComponentDrop(evt, component.value.id, component.value.parent, index.value)
      }
    }
    return {
      isRenderer: componentType.value.isRenderer,
      componentClass: componentType.value.definition,
      postName,
      component,
      children,
      dragging,
      isEditMode,
      dragLeave,
      dragSelf,
      onClick,
      onDragLeave,
      onDragEnter,
      remove,
      onComponentDrag,
      onComponentDragEnd,
      resetDragLeave,
      onDrop
    }
  }
}
</script>

<style scoped>
.edit-mode-component {
  border: 1px solid #c4cdd8;
  padding: 2px;
  margin-bottom: 2px;
}

.component-header .component-title {
  color: #c4cdd8;
  font-size: 10px ;
  font-weight: normal;
  font-family: sans-serif;
}

.edit-mode-component:hover {
  border: 2px solid #6fc2f1;
}

.droppable {
  border: 2px solid #6fc2f1;
}

.disable-self {
  pointer-events: none;
}

.component-content {
  height: 100%;
  display: flex;
  flex-flow: column;
}

/*.component-content:hover > .dropzone{*/
/*   background: #6fc2f1;*/
/*   padding:5px;*/
/* }*/
</style>
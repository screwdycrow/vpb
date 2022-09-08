<template>
  <!-- tailwind css drag and drop area -->
  <div class="column">
  </div>
  <div class="flex flex-col items-center justify-center" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent v-if="isEditorActive">
    <div
        class="flex flex-col items-center text-gray-500 justify-center w-full h-1/2 border-2 border-dashed border-gray-400 rounded-lg" @click="setRendererAdd(id)" :class="{'dragAreaActive':dragging!==null}">
      <div class="flex flex-col items-center justify-center">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <p class="my-1 text-sm"> Drag and drop components here </p>
      </div>
    </div>
  </div>

</template>

<script>
import usePostEditor from "@/vpb/composables/usePostEditor";
import {toRefs} from "vue";

export default {
  name: "VpbColumn",
  props: {
    id: String,
  },
  setup(props) {
    const {id} = toRefs(props);
    const postEditor = usePostEditor();
    const {isEditorActive, dragging} = toRefs(postEditor);
    const onDrop = (evt) => {
      if (dragging.value === 'componentType') {
        console.log(evt)
        console.log(evt.dataTransfer.getData('type'))
        postEditor.onComponentTypeDrop(evt, id.value)
      }
    }
    const setRendererAdd = (renderer) => {
      postEditor.setActiveRenderAdd(renderer)
    }
    return {isEditorActive, dragging, id, onDrop,setRendererAdd}
  }
}
</script>

<style scoped>
  .dragAreaActive{
     border-color: #6fc2f1;
     color: #6fc2f1;
  }
</style>
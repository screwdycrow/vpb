<template>
  <div class="flex flex-col items-center justify-center" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent
       v-if="isEditorActive">
    <div
        class="flex flex-col items-center text-gray-500 justify-center w-full h-1/2 border-2 border-dashed border-gray-400 rounded-lg"
        @click="setRendererAdd(id)" :class="{'dragAreaActive':dragging!==null}">
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
import {toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default {
  props: {
    id: String,
  },
  name: "VpbAddComponent",
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
    return {isEditorActive, dragging, id, onDrop, setRendererAdd }
  }
}
</script>

<style scoped>
.drag-area {
  @apply flex justify-center items-center;
  height: 100px;
  background-color: #f5f5f5;
  border: 1px dashed #ccc;
  border-radius: 5px;
  margin-bottom: 0;
}

.drag-area__inner {
  @apply flex justify-center items-center;
  width: 100%;
  height: 100%;
}

.drag-area__inner__content {
  @apply flex justify-center items-center;
  width: 100%;
  height: 100%;
}

.drag-area__inner__content__icon {
  @apply flex justify-center items-center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
}
.dragAreaActive{
  color:deepskyblue;
  border-color: deepskyblue;
}
.drag-area__inner__content__text {
  @apply flex justify-center items-center;
  margin-left: 10px;
}
</style>
<template>
  <div class="flex flex-col items-center justify-center" @drop="onDrop($event)" @dragleave.prevent="onDragLeave($event)" @dragover.prevent @dragenter.prevent="onDragEnter($event)"
       v-if="isEditorActive">
    <div
        class="flex flex-col items-center text-gray-400 justify-center w-full border border-dashed rounded-lg"
        @click="setRendererAdd(id)" :class="{'dragAreaActive':dragging!==null, 'dropzone':isDragHover}">
      <div class="flex  items-center justify-center">
        <p class="my-1 text-sm"> Drag and drop components here </p>
      </div>
    </div>
  </div>
</template>
<script>
import {computed, ref, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default {
  props: {
    id: String,
    index: Number,
  },
  name: "VpbAddComponent",
  emits: ['addedComponent'],
  setup(props,{emit}) {
    const {id,index} = toRefs(props);
    const postEditor = usePostEditor();
    const {isEditorActive, dragging} = toRefs(postEditor);
    let isDragHover = computed(()=>dragLeave.value > 0 )
    let dragLeave = ref(0)

    const onDrop = (evt) => {
      evt.stopPropagation();
      dragLeave.value = 0;
      if (dragging.value === 'componentType') {
        postEditor.onComponentTypeDrop(evt, id.value,index.value)
      }else if(dragging.value === 'component'){
        postEditor.onComponentDrop(evt, id.value, index.value)
      }
      emit('addedComponent')

    }
    const onDragEnter = (evt) => {
      dragLeave.value++
    }
    const onDragLeave = (evt) => {
      dragLeave.value--
    }
    const setRendererAdd = (renderer) => {
      postEditor.setActiveRenderAdd(renderer)
    }
    return {isEditorActive, dragging, id, onDrop, setRendererAdd, isDragHover, onDragEnter,onDragLeave ,dragLeave}
  }
}
</script>

<style scoped>
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

.dragAreaActive {
  color: deepskyblue;
  border-color: deepskyblue;
  height: 100px;
}

.dropzone {
  background: #6fc2f1;
  color: white;
}
.drag-area__inner__content__text {
  @apply flex justify-center items-center;
  margin-left: 10px;
}
</style>
<template>
  <div class="grid grid-cols-2 p-2 m-1 rounded-xl">
    <div class="bg-white rounded shadow flex flex-col justify-center items-center p-3 hover:bg-slate-300"
         v-for="c in componentTypes" draggable="true"
         @dragstart="onComponentTypeDrag($event, c)"
         @dragend="onComponentTypeDragEnd"
    >
      {{ c.name }}
    </div>
  </div>
  <div>
  </div>
</template>

<script>
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";

export default {
  name: "VpbComponentTypes",
  setup() {
    const adminStore = useVpbAdminStore()
    const editorStore = useVpbEditorStore();
    const onComponentTypeDrag = (evt, componentType) => {
      evt.dataTransfer.setData('type', componentType.type)
      //set dragging to componentType
      editorStore.setDragging('componentType')
    }
    const onComponentTypeDragEnd = (evt, componentType) =>{
     editorStore.setDragging(null);
    }
    return {
      componentTypes: adminStore.componentTypes,
      onComponentTypeDrag,
      onComponentTypeDragEnd
    }
  }
}
</script>

<style scoped>

</style>
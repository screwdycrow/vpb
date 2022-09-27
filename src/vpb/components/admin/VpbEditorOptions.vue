<template>
  <div class=" bg-slate-300 rounded-lg shadow-lg  flex flex flex-col" v-if="activePost">
    <div class="rounded-lg grow">
      <div class="flex justify-between items-center p-3 bg-blue-500 text-white">
        <strong class="font-black">Editing {{ activePost.title }} </strong>
      </div>
      <hr>
      <div v-if="activeComponent === null ">
        <vpb-component-types></vpb-component-types>
      </div>
      <div v-else>
        <vbp-component-props></vbp-component-props>
      </div>
    </div>
    <div class="flex bg-slate-100 p3-3 justify-around">
      <a href="#" class="block px-3 py-4 text-sm  text-green-700 hover:bg-slate-300"
         v-if="activePost"
         @click="saveChanges()">
        Save
      </a>
      <a href="#" class="block px-4 py-4 text-sm  text-red-700 hover:bg-slate-300"
         v-if="activePost"
         @click="cancelChanges()">
        Cancel
      </a>
    </div>

  </div>
</template>

<script>
import usePostEditor from "@/vpb/composables/usePostEditor";
import {computed, ref, toRefs} from "vue";
import VpbComponentTypes from "@/vpb/components/admin/VpbComponentTypes";
import VbpComponentProps from "@/vpb/components/admin/VbpComponentProps";

export default {
  name: "VpbEditorOptions",
  components: {VbpComponentProps, VpbComponentTypes},
  setup(props, ctx) {
    const postEditor = usePostEditor();
    const {activePost, activeRendererAdd,activeComponent} = toRefs(postEditor);
    const saveChanges = () => {
      postEditor.saveChanges();
    }
    const cancelChanges = () => {
      postEditor.cancelChanges();
    }
    const activePostName = computed(() => {
      return activePost.value ? activePost.value.name : null;
    })
    return {activePost, activePostName, saveChanges, cancelChanges, activeRendererAdd,activeComponent}
  }
}
</script>

<style scoped>

</style>
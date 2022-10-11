<template>
    <div class="justify-between items-center mt-3">
      <label class="text-gray-700 font-bold mr-3"> {{prop.label}} </label>
      <textarea class="w-full border border-gray-200 rounded-lg   px-1 py-1" type="text" rows="10" :placeholder="prop.defaultValue"
             id="name"  v-model="activeComponent.props[prop.name]"></textarea>
    </div>
</template>

<script>
import Prop from "@/vpb/models/Prop";
import {toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default {
  name: "VpbTextareaField",
  props: {
    prop: Prop
  },
  setup(props) {
    const {prop} = toRefs(props)
    const {activeComponent} = toRefs(usePostEditor())
    return {prop, activeComponent}
  }
}
</script>

<style scoped>

</style>
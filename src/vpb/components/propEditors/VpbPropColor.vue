<template>
  <div class="mt-3">
    <label class="text-gray-700 font-bold mr-3"> {{prop.label}} </label>

    <div class="flex justify-between items-center">
      <input class="w-1/2 border border-gray-200 rounded-lg px-1 py-1" type="text" :placeholder="prop.defaultValue"
             v-model="activeComponent.props[prop.name]"/>
      <input class="border border-gray-200 px-1 py-1 w-10 rounded-lg " type="color"
             v-model="activeComponent.props[prop.name]"/>
    </div>
  </div>
</template>

<script>
import {toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
import Prop from "@/vpb/models/Prop";

export default {
  name: "VpbPropColor",
  props: {
    prop: Prop
  },
  setup(props){
    const {prop} = toRefs(props)
    const {activeComponent} = toRefs(usePostEditor())
    return {prop, activeComponent}
  }
}
</script>

<style scoped>

</style>
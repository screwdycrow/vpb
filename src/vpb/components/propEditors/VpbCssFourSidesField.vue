<template>
  <div>
    <label class="text-gray-700 font-bold"> {{prop.label}} </label>
    <div class="flex justify-between items-center mb-3">
      <div class="side mr-1">
        <label class="text-gray-500 "> Top </label>
        <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type="text"
                v-model="activeComponent.props[prop.name][0]"/>
      </div>
      <div class="side mr-1">
        <label class="text-gray-500 "> Right </label>
        <input class="w-full border border-gray-200 rounded-lg  px-1 py-1" type="text"
                v-model="activeComponent.props[prop.name][1]"/>
      </div>
      <div class="side mr-1">
        <label class="text-gray-500"> Bot </label>
        <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type='text'
                v-model="activeComponent.props[prop.name][2]"/>
      </div>
      <div class="side">
        <label class="text-gray-500"> Left </label>
        <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type="text"
               v-model="activeComponent.props[prop.name][3]"/>
      </div>
    </div>
  </div>

</template>

<script>
import Prop from "@/vpb/models/Prop";
import {toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default {
  name: "VpbCssFourSidesField",
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
.side {
  font-size: 0.9em;
}
</style>
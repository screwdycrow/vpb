<template>
  <!-- tailwind checkbox -->
  <div class="flex justify-between">
    <label class="text-gray-700 font-bold mr-3" :for="prop.name">
      {{prop.label}}
    </label>
    <input
      type="checkbox"
      class="form-checkbox h-5 w-5 text-blue-500"
      :id="prop.name"
      v-model="activeComponent.props[prop.name]"
    />
  </div>
</template>

<script>
import Prop from "@/vpb/models/Prop";
import {toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default {
  name: "VpbCheckboxField",
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
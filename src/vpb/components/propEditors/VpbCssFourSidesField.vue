<template>
  <div>
    <div class="component-header">
      <span class="text-gray-700 font-bold"> {{ prop.label }} </span>
      <button @click="toggleLinkFields()" :class="{'text-blue-500':linkFields}" class="rounded-lg px-1 rounded-xl"><i class="mdi mdi-link"></i></button>
    </div>
    <div class="flex justify-between items-center items-center mb-3">
      <div class="side mr-1">
        <label class="text-gray-500 "> Top </label>
        <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type="text"
               v-model="activeComponent.props[prop.name][0]"
              @input="onFieldInput($event)"
        />
      </div>
      <div class="side mr-1">
        <label class="text-gray-500 "> Right </label>
        <input class="w-full border border-gray-200 rounded-lg  px-1 py-1" type="text"
               v-model="activeComponent.props[prop.name][1]"
               @input="onFieldInput($event)"
        />
      </div>
      <div class="side mr-1">
        <label class="text-gray-500"> Bot </label>
        <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type='text'
               v-model="activeComponent.props[prop.name][2]"
               @input="onFieldInput($event)"
        />
      </div>
      <div class="side">
        <label class="text-gray-500"> Left </label>
        <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type="text"
               v-model="activeComponent.props[prop.name][3]"
               @input="onFieldInput($event)"
        />
      </div>

    </div>
  </div>

</template>

<script>
import Prop from "@/vpb/models/Prop";
import {ref, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default {
  name: "VpbCssFourSidesField",
  props: {
    prop: Prop
  },
  setup(props) {
    const {prop} = toRefs(props)
    let linkFields = ref(true)
    const {activeComponent} = toRefs(usePostEditor())
    const toggleLinkFields = ()=>{
      linkFields.value = !linkFields.value
    }
    const onFieldInput = (evt)=>{
      console.log(activeComponent.value)
      if(!linkFields.value)return;
      activeComponent.value.props[prop.value.name][0] = evt.target.value
      activeComponent.value.props[prop.value.name][1] = evt.target.value
      activeComponent.value.props[prop.value.name][2] = evt.target.value
      activeComponent.value.props[prop.value.name][3] = evt.target.value
    }
    return {prop, activeComponent, linkFields, toggleLinkFields,onFieldInput}
  }
}
</script>

<style scoped>
.side {
  font-size: 0.9em;
}
</style>
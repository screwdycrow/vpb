<template>
  <div>
    <vpb-array-object :prop="prop">
      <template v-slot:item-label="data">
        <h2 class="">
          {{ data.item.title }} : {{ data.item.field }}
        </h2>
      </template>
      <template v-slot:item="data">
        <div class="grid grid-cols-2 justify-between items-center items-center">
          <div class="item mr-1">
            <label class="text-gray-500"> Title </label>
            <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type="text"
                   v-model="activeComponent.props[prop.name][data.index].title"
            />
          </div>
          <div class="item mr-1">
            <label class="text-gray-500 "> Field </label>
            <input class="w-full border border-gray-200 rounded-lg  px-1 py-1" type="text"
                   v-model="activeComponent.props[prop.name][data.index].field"
            />
          </div>
          <div class="item mr-1">
            <label class="text-gray-500"> formatter </label>
            <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type='text'
                   v-model="activeComponent.props[prop.name][data.index].formatter"
            />
          </div>
        </div>
      </template>
    </vpb-array-object>
  </div>
</template>

<script>
import Prop from "@/vpb/models/Prop";
import {toRefs, ref} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
import VpbArrayObject from "@/vpb/components/propEditors/VpbArrayObject";

export default {
  components: {VpbArrayObject},
  props: {
    prop: Prop
  },
  name: "DataTableColumnEditor",
  setup(props) {
    const {prop} = toRefs(props)
    const {activeComponent} = toRefs(usePostEditor())
    return {prop, activeComponent}
  }
}
</script>

<style scoped>

</style>
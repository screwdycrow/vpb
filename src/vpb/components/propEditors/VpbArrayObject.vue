<template>
  <!--  list fields input -->
  <div>
    <div class="justify-between items-center mt-3  ">
      <label class="text-gray-700 font-bold mr-3"> {{ prop.label }} </label>
      <button @click="addDefault()" class=" bg-blue-500 text-white rounded-lg px-1 rounded-xl"><i
          class="mdi mdi-plus"></i></button>
    </div>
    <div class="accordion mt-3">
      <div class="accordion-item " v-for="(item, index)  in activeComponent.props[prop.name]">
        <div
            class="accordion-header flex justify-between border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200 p-2"
            @click="setActive(index)"
        >
          <h2 class="">
            <slot name="item-label" :item="item" :index="index"></slot>
          </h2>
          <!-- remove item button -->
          <div>
            <button @click.stop="removeItem(index)" class="  rounded-lg px-1 rounded-xl"><i class="mdi mdi-delete"></i>
            </button>
            <button class="accordion-button collapsed" type="button">
              <i class="mdi" :class="{'mdi-chevron-up':active === index, 'mdi-chevron-down':active !== index}"></i>
            </button>
          </div>

        </div>
        <div class="accordion-collapse collapse bg-slate-200" v-if="active === index">
          <div class="p-3">
              <slot name="item" :item="item" :index="index"></slot>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import Prop from "@/vpb/models/Prop";
import {ref, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
import {cloneDeep} from "lodash";

export default {
  props: {prop: Prop},
  name: "VpbArrayObject",
  setup(props) {
    const {prop} = toRefs(props)
    const {activeComponent} = toRefs(usePostEditor())
    let active = ref(0)
    const removeItem = (index) => {
      activeComponent.value.props[prop.value.name].splice(index, 1)
    }
    const moveUpItem = (index) => {
      const item = activeComponent.value.props[prop.name][index]
      activeComponent.value.props[prop.value.name].splice(index, 1)
      activeComponent.value.props[prop.value.name].splice(index - 1, 0, item)
    }
    const moveDownItem = (index) => {
      const item = activeComponent.value.props[prop.value.name][index]
      activeComponent.value.props[prop.value.name].splice(index, 1)
      activeComponent.value.props[prop.value.name].splice(index + 1, 0, item)
    }
    const addDefault = () => {
      activeComponent.value.props[prop.value.name].push(cloneDeep(prop.value.defaultValue[0]))
    }
    const addPropItem = (item) => {
      if (activeComponent.value.props[prop.value.name] === undefined) {
        activeComponent.value.props[prop.value.name] = []
      }
      activeComponent.value.props[prop.value.name].push(cloneDeep(item))
    }
    const setActive = (index) => {
      if (active.value !== index) {
        active.value = index
      } else {
        active.value = -1
      }
    }
    return {
      prop, activeComponent, removeItem, moveUpItem, addDefault, moveDownItem, addPropItem, active, setActive
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <vpb-array-object :prop="prop">
    <template v-slot:item-label="data">
      <h2 class="">
        {{ activeComponent.props['name'] || activeComponent.id}} : {{ data.item.target }}
      </h2>
    </template>
    <template v-slot:item="data">
      <div class="grid grid-cols-1 justify-between items-center items-center">
        <div class="item mr-1">
          <vpb-select label="Effect"
                      option-key="key"
                      option-label="label"
                      :items="effects"
                      v-model="activeComponent.props[prop.name][data.index].effect"/>
        </div>
        <div class="item mr-1">
          <vpb-select label="Target"
                      option-key="id"
                      option-label="label"
                      :items="dataTables"
                      v-model="activeComponent.props[prop.name][data.index].target"/>
        </div>
        <div class="grid grid-cols-5">
          <div class="item mr-1 col-span-2 ">
            <label class="text-gray-500"> {{activeComponent.props['name'] || activeComponent.id}} </label>
            <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type='text'
                   v-model="activeComponent.props[prop.name][data.index].sourceField"/>
          </div>
          <vpb-select label="Op"
                      option-key="key"
                      option-label="label"
                      :items="operators"
                      v-model="activeComponent.props[prop.name][data.index].op"/>
          <div class="item mr-1 col-span-2">
            <label class="text-gray-500"> {{activeComponent.props[prop.name][data.index].target}}  </label>
            <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type='text'
                   v-model="activeComponent.props[prop.name][data.index].targetField"/>
          </div>
        </div>

      </div>
    </template>
  </vpb-array-object>
</template>

<script>
import Prop from "@/vpb/models/Prop";
import {computed, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
import VpbArrayObject from "@/vpb/components/propEditors/VpbArrayObject";
import {useVpbDataTableStore} from "@/vpbDatatables/store/vpbDataTableStore";
import VpbSelect from "@/vpb/components/inputs/VpbSelect";

export default {
  name: "DataTableEventEditor",
  components: {VpbSelect, VpbArrayObject},
  props: {
    prop: Prop
  },
  setup(props) {
    const {prop} = toRefs(props)
    const operators=[
      {key: '=', label: '='},
      {key: '!=', label: '!='},
      {key: '>', label: '>'},
      {key: '>=', label: '>='},
      {key: '<', label: '<'},
      {key: '<=', label: '<='},
      {key: 'like', label: 'like'},
    ]
    const effects = [
      {key:'filter', label:'Filter'},
      {key:'group', label:'Group'}
    ]
    const {activeComponent} = toRefs(usePostEditor())
    const dataTableStore = useVpbDataTableStore()

    const dataTables = computed(() => dataTableStore.dataTablesArray || [])
    datatablesMap = computed(() => dataTableStore.dataTablesMap || {})
    return {prop, activeComponent, dataTables , effects, operators}
  }
}
</script>

<style scoped>

</style>
<template>
  <vpb-array-object :prop="prop">
    <template v-slot:item-label="data">
      <h2 class="">
        {{ data.item.eventType }} : {{ data.item.target }}
      </h2>
    </template>
    <template v-slot:item="data">
      <div class="grid grid-cols-1 justify-between items-center items-center">
        <div class="item mr-1">
          <vpb-select label="Event Type"
                      option-key="eventType"
                      option-label="label"
                      :items="eventTypes"
                      v-model="activeComponent.props[prop.name][data.index].eventType"/>
        </div>
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
        <div class="item mr-1">
          <label class="text-gray-500"> Source Column  </label>
          <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type='text'
                 v-model="activeComponent.props[prop.name][data.index].sourceColumn"
          />
        </div>
        <div class="item mr-1">
          <label class="text-gray-500"> Target Column  </label>
          <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type='text'
                 v-model="activeComponent.props[prop.name][data.index].targetColumn"
          />
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
    const eventTypes = [
      {key:'onRowClick', label:'onRowClick'},
      {key:'onColumnClick', label:'onColumnClick'},
    ]
    const effects = [
      {key:'filter', label:'Filter'},
      {key:'group', label:'Group'}
    ]
    const {activeComponent} = toRefs(usePostEditor())
    const dataTableStore = useVpbDataTableStore()

    const dataTables = computed(() => dataTableStore.dataTablesArray || [])
    return {prop, activeComponent, dataTables,eventTypes, effects}
  }
}
</script>

<style scoped>

</style>
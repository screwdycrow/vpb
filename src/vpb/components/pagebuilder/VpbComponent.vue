<template>
  <div class="component-content">
    <component :is="getComponentClass()"
               v-bind="{children:children, postName:postName,isEditMode:isEditMode}"
               :key="component.id"></component>
  </div>
</template>

<script>
import {computed, toRefs} from "vue";
import {storeToRefs} from "pinia";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";

export default {
  props: {
    postName: String,
    component: Object,
  },
  name: "VpbComponent",
  setup(props, ctx) {
    const {component, postName} = toRefs(props);

    const getComponentClass = () => {
      const {componentDefinitions} = storeToRefs(useVpbAdminStore())
      return componentDefinitions.value[component.value.componentType];
    }
    const editorStore = useVpbEditorStore();
    const {renderStructure, activePost} = storeToRefs(editorStore)

    const isEditMode = computed(()=>{
      if (activePost.value === null) return false;
      console.log(activePost.value.name, postName.value)
      return activePost.value.name === postName.value
    })

    const children = computed(() => {
          let children = []
          if (editorStore.structureOf(postName.value)[component.id] !== undefined) {
            children = editorStore.structureOf(postName.value)[component.id]
          }
          return children
        }
    )
    return {
      postName,
      renderStructure,
      getComponentClass,
      component,
      children,
      isEditMode
    }
  }
}
</script>

<style scoped>

</style>
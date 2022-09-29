<template>
  <div class="form">
    <div v-for="prop in  componentProps" class="mt-1 mb-2">
      <component  v-bind="{prop}" :is="propEditorOf(prop.type).definition" :key="prop.name"></component>
    </div>

  </div>
</template>

<script>
import {computed, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import Prop from "@/vpb/models/Prop";

export default {

  name: "VbpComponentProps",
  setup() {
    const {activeComponent} = usePostEditor();
    const adminStore = useVpbAdminStore();
    const componentType = computed(() => {
      return adminStore.componentTypeOf(activeComponent.value.componentType)
    })
    const propEditorOf =  adminStore.propEditorOf

    const componentProps = computed(() => {
      return Array.from(componentType.value.props.values())
    })
    return {activeComponent, componentProps, propEditorOf}
  }
}
</script>

<style scoped>
.form {
  padding: 1em;
}

.form input {
  width: 100%;
}
</style>
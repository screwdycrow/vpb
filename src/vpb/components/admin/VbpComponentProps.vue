<template>
<div class="form">
  <div class="justify-between items-center mt-3" v-for="prop in componentProps">
    <label class="text-gray-700 font-bold mr-3"> {{prop.label}} </label>
    <input class="w-full border border-gray-200 rounded-lg px-1 py-1" type="text" placeholder="path"
           :type="prop.type" id="name" v-model="activeComponent.props[prop.name]"/>
  </div>
</div>
</template>

<script>
import {computed} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

export default {
  name: "VbpComponentProps",
  setup() {
    const {activeComponent} = usePostEditor();
    const adminStore = useVpbAdminStore();
    const componentType = computed(() => {
      return adminStore.componentTypeOf(activeComponent.value.componentType)
    })
    const componentProps = computed(() => {
      return Array.from(componentType.value.props.values())
    })
    return {activeComponent, componentProps}
  }
}
</script>

<style scoped>
.form{
  padding:1em;
}
.form input{
  width:100%;
}
</style>
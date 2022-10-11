<template>
<!--  list fields input -->
  <slot
</template>

<script>

import Prop from "@/vpb/models/Prop";

export default {
  props:{prop:Prop},
  name: "VpbArrayObject",
  setup(props){
    const {prop} = toRefs(props)
    const propItems = ref([])
    addPropItem(item)=>{
    }
    return {prop}
  }
}
</script>

<style scoped>

</style>
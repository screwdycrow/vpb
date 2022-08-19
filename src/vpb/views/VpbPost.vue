<template>
  <!-- tailwind css page heading -->
  <div class="flex justify-between items-center p-5">
    <h1 class="font-black text-xl "> {{name}} </h1>
  </div>
</template>

<script>
import {toRefs} from "vue";

export default {
  name: "VpbPost",
  props:{
    name: {
      type: String,
      required: true
    }
  },
  setup(props){
    const {name} = toRefs(props);
    return {
      name
    }

  }
}
</script>

<style scoped>

</style>
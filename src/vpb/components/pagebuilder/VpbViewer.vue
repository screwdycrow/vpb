<template>
  <div class="wrap">
    {{ structure }}
  </div>

</template>

<script>
import {toRefs} from "vue";
import useRenderStructure from "@/vpb/composables/useRenderStructure";

export default {
  name: "VpbViewer",
  props: {
    post: {type: Object, required: true}
  },
  setup(props) {
    const {post} = toRefs(props)
    const {structure, rootChildren} = toRefs(useRenderStructure(post.value))
    return {structure, rootChildren}
  }
}
</script>

<style scoped>

</style>
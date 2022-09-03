<template>
  <div class="wrap">
    {{ structure }}
    {{ rootChildren }}
  </div>

</template>

<script>
import {toRefs} from "vue";
import useRenderer from "@/vpb/composables/useRenderer";

export default {
  name: "VpbViewer",
  props: {
    post: {type: Object, required: true}
  },
  setup(props) {
    const {post} = toRefs(props)
    const {structure, rootChildren} = toRefs(useRenderer(post.value))
    return {structure, rootChildren}
  }
}
</script>

<style scoped>

</style>
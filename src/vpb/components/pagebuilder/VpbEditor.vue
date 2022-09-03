<template>
  <div class="wrapper edit-mode">
    {{structure}}
  </div>
</template>

<script>
import {toRefs} from "vue";
import useRenderer from "@/vpb/composables/useRenderer";

export default {
  props: {
    post: {type: Object, required: true}
  },
  name: "VpbEditor",
  setup(props) {
    const {post} = toRefs(props)
    const {structure, rootChildren} = toRefs(useRenderer(post.value))
    return {structure, rootChildren}
  }
}
</script>

<style scoped>
.edit-mode {
  border: 2px dashed #6fc2f1;
  padding:5px;
}
</style>
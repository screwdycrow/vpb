<template>
  <div class="wrap">
    <pre>
    {{ post.content }}
    </pre>
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
    return {post}
  }
}
</script>

<style scoped>

</style>
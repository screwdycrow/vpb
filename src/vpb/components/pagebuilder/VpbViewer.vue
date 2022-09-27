<template>
  <div class="wrap">
    <div class="root renderer">
      <vpb-column :post-name="post.name" :children="post.content.root" id="root" :is-edit-mode="false"></vpb-column>
    </div>
  </div>

</template>

<script>
import {toRefs} from "vue";
import useRenderStructure from "@/vpb/composables/useRenderStructure";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";

export default {
  name: "VpbViewer",
  components: {VpbColumn},
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
<template>
  <div class="wrapper edit-mode">
    <div class="root renderer">
      <vpb-row :children="rootChildren" :post-name="post.name" id="root"></vpb-row>
    </div>
  </div>
</template>

<script>
import {computed, toRefs} from "vue";
import useRenderStructure from "@/vpb/composables/useRenderStructure";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";

export default {
  components: {VpbRow, VpbComponent, VpbColumn},
  props: {
    post: {type: Object, required: true}
  },
  name: "VpbEditor",
  setup(props) {
    const {post} = toRefs(props)
    const renderer = useRenderStructure(post.value)
    const {structure,rootChildren} = toRefs(renderer)
    return {structure,rootChildren,post}
  }
}
</script>

<style scoped>


.root:hover {
  width: 100%;
  border: 2px solid cornflowerblue;
  padding: 5px;
}

.edit-mode {
  min-height: 400px;
}
</style>
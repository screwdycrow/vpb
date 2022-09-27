<template>
  <div class="wrapper editor  p-1">
    <div class="root renderer">
      <vpb-column :children="post.content.root" :is-edit-mode="true" :post-name="post.name" id="root"></vpb-column>
    </div>
    <div class="root adder">
      <vpb-add-component id="root"></vpb-add-component>
    </div>
  </div>
</template>

<script>
import {computed, toRefs} from "vue";
import useRenderStructure from "@/vpb/composables/useRenderStructure";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import VpbAddComponent from "@/vpb/components/pagebuilder/VpbAddComponent";

export default {
  components: {VpbAddComponent, VpbRow, VpbComponent, VpbColumn},
  props: {
    post: {type: Object, required: true}
  },
  name: "VpbEditor",
  setup(props) {
    const {post} = toRefs(props)
    return {post}
  }
}
</script>

<style scoped>


.editor .root:hover {
  width: 100%;
}
</style>
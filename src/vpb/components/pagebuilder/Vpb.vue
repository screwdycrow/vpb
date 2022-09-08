<template>
  <vpb-viewer :post="post" v-if="!isEditMode"></vpb-viewer>
  <vpb-editor :post="activePost" v-if="isEditMode"></vpb-editor>
</template>

<script>
import usePostEditable from "@/vpb/composables/usePostEditable";
import {toRefs} from "vue";
import {usePost} from "@/vpb/composables/usePost";
import VpbViewer from "@/vpb/components/pagebuilder/VpbViewer";
import VpbEditor from "@/vpb/components/pagebuilder/VpbEditor";

export default {
  name: "Vpb",
  components: {VpbEditor, VpbViewer},
  props: {
    name: String
  },
  setup(props) {
    const {post, isEditMode, activePost,rootChildren} = toRefs(usePost(props.name));
    usePostEditable(post.value)
    return {post, isEditMode,activePost, rootChildren}
  }

}
</script>

<style scoped>

</style>
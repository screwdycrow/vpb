<template>
  <div :class="{'edit-mode':isEditMode}">

  </div>
</template>

<script>
import Post from "@/vpb/models/Post";
import usePostEditable from "@/vpb/composables/usePostEditable";
import {toRefs} from "vue";
import {usePost} from "@/vpb/composables/usePost";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default {
  name: "Vpb",
  props: {
    name: String
  },
  setup(props) {
    const {post, isEditMode, activePost} = toRefs(usePost(props.name));
    usePostEditable(post.value)

    return {post, isEditMode,activePost}
  }

}
</script>

<style scoped>
 .edit-mode {
   border: 2px solid red;
 }
</style>
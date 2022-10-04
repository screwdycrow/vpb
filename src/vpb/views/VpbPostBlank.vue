<template>
  <div><vpb :name="post.name"></vpb></div>
</template>

<script>
import Vpb from "@/vpb/components/pagebuilder/Vpb";
import {usePost} from "@/vpb/composables/usePost";

export default {
  name: "VpbPostBlank",
  components: {Vpb},
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {post} = usePost(props.name);
    return {
      post
    }
  }
}
</script>

<style scoped>

</style>
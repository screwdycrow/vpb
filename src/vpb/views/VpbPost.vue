<template>
  <div class="bg-slate-300 shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">
        {{post.title}}
      </h1>
    </div>
  </div>
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <vpb :name="post.name"></vpb>
  </div>
</template>

<script>
import {toRefs} from "vue";
import {usePost} from "@/vpb/composables/usePost";
import Vpb from "@/vpb/components/pagebuilder/Vpb";

export default {
  name: "VpbPost",
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
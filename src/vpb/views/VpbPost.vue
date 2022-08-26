<template>
  <div class="container mx-auto">
      <div class="flex justify-between items-center ">
        <h1 class="font-black" style="font-size: 43px"> {{post.title}} </h1>
      </div>
      <div class="content">
        <vpb :name="post.name"> </vpb>
      </div>
  </div>
</template>

<script>
import {toRefs} from "vue";
import {usePost} from "@/vpb/composables/usePost";
import Vpb from "@/vpb/components/pagebuilder/Vpb";

export default {
  name: "VpbPost",
  components: {Vpb},
  props:{
    name: {
      type: String,
      required: true
    }
  },
  setup(props){
    const {post} = usePost(props.name);
    return {
      post
    }

  }
}
</script>

<style scoped>

</style>
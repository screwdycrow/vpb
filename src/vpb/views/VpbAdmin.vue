<template>
  <div class="flex">
    <vpb-posts-list class="w-100"></vpb-posts-list>
    <div class=" mt-5 ml-5">
      <div class="flex justify-between ">
        <h1 class="text-xl font-bold flex "> Parts </h1>
      </div>
    </div>
  </div>

</template>

<script>
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {mapState} from "pinia";
import VpbComponentTypes from "@/vpb/components/admin/VpbComponentTypes";
import VpbPostsList from "@/vpb/components/admin/VpbPostsList";

export default {
  name: "VpbAdmin",
  components: {VpbPostsList, VpbComponentTypes},

  computed: {
    ...mapState(useVpbAdminStore, [
      'componentTypes',
      'posts'
    ])
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <vpb-posts-list></vpb-posts-list>
  </div>
</template>

<script>
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {mapState} from "pinia";
import VpbComponentTypes from "@/vpb/components/admin/VpbComponentTypes";
import VpbPostsList from "@/vpb/components/admin/VpbPostsList";
import DataTable from "@/components/DataTable";

export default {
  name: "VpbAdmin",
  components: {DataTable, VpbPostsList, VpbComponentTypes},

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
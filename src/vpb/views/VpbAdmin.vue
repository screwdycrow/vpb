<template>
  <div>
    <vpb-posts-list></vpb-posts-list>
    <vpb-source-list></vpb-source-list>
  </div>
</template>

<script>
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {mapState} from "pinia";
import VpbComponentTypes from "@/vpb/components/admin/VpbComponentTypes";
import VpbPostsList from "@/vpb/components/admin/VpbPostsList";
import DataTable from "@/vpbDatatables/components/DataTable";
import VpbSourceList from "@/vpb/components/admin/VpbSourceList";

export default {
  name: "VpbAdmin",
  components: {VpbSourceList, DataTable, VpbPostsList, VpbComponentTypes},

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
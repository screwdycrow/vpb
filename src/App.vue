<template>
  <nav style="background: lightblue; padding: 1em;" class="flex ">
    <router-link to="/">Home</router-link> |
  </nav>
  <vpb-admin-menu admin-path="/" style="position: fixed; bottom: 30px; right: 30px"></vpb-admin-menu>
  <router-view/>
</template>

<style>

</style>
<script>
import VpbAdminMenu from "@/vpb/components/admin/VpbAdminMenu";
export default {
  components: {VpbAdminMenu }
}
</script>
<template>
  <div>
    <vpb-admin-menu admin-path="/" style="position: fixed; bottom: 30px; right: 30px"></vpb-admin-menu>
    <div class="flex">
      <div v-if="activePost" style="width:250px; height:100vh">
        <vpb-editor-options style="height:100%; width: 250px;  position: fixed;"></vpb-editor-options>
      </div>
      <div class="grow">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>

</style>
<script>
import VpbAdminMenu from "@/vpb/components/admin/VpbAdminMenu";
import VpbEditorOptions from "@/vpb/components/admin/VpbEditorOptions";
import {toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
export default {
  components: {VpbEditorOptions, VpbAdminMenu },
  setup(){
    const {activePost} = toRefs(usePostEditor())
    return {activePost}
  }
}
</script>
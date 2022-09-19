<template>
  <div class="wrap" :class="{'edit-mode':isEditMode}">
    <div class="row">
      <div class="component" v-for="c in children" >
        <vpb-component :component="c" :post-name="postName"></vpb-component>
      </div>
    </div>
  </div>


</template>

<script>

import {toRefs} from "vue";
import VpbAddComponent from "@/vpb/components/pagebuilder/VpbAddComponent";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import {storeToRefs} from "pinia";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
export default {
  components: {VpbComponent, VpbAddComponent},
  props: {
    id: String,
    postName: String,
    children: Array,
    isEditMode:Boolean,
  },
  name: "VpbRow",
  setup(props){
    const {children, id,postName, isEditMode} = toRefs(props)

    return {children, id,postName, isEditMode}
  }
}
</script>

<style scoped>
.edit-mode{
  padding:2px;
}

.edit-mode:hover > .editor{
   display: inherit;
}
  .edit-mode .editor{
  }

</style>
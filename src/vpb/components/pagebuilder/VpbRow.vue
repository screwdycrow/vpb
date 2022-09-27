<template>
  <div class="wrap" :class="{'edit-mode':isEditMode}">
    <div class="row">
      <div class="component" v-for="(c, index) in children" :key="c.id" >
        <vpb-component :component="c" :index="index" :post-name="postName"></vpb-component>
      </div>
    </div>
  </div>


</template>

<script>

import {toRefs} from "vue";
import VpbAddComponent from "@/vpb/components/pagebuilder/VpbAddComponent";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import ComponentProps from "@/vpb/models/ComponentProps";
export default {
  components: {VpbComponent, VpbAddComponent},
  props: {...ComponentProps},
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
.row{
  display:flex;
}
.row > .component{
  flex-grow: 1;
}
.edit-mode:hover > .editor{
   display: inherit;
}
  .edit-mode .editor{
  }

</style>
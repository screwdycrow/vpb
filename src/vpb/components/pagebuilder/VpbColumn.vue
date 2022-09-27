<template>
  <div class="wrap" :class="{'edit-mode':isEditMode}">
    <div class="column">
      <div class="component" v-for="(c, index) in children" :key="c.id" >
        <vpb-component :component="c" :index="index" :post-name="postName"></vpb-component>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, toRefs} from "vue";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import ComponentProps from "@/vpb/models/ComponentProps";

export default {
  name: "VpbColumn",
  components: { VpbComponent},
  props: {...ComponentProps},
  setup(props){
    const {children, id,postName, isEditMode} = toRefs(props)
    return {children, id,postName, isEditMode}
  }
}
</script>

<style scoped>
.dragAreaActive {
  border-color: #6fc2f1;
  color: #6fc2f1;
}
</style>
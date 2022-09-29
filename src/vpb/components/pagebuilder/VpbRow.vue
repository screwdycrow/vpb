<template>
  <div class="wrap" :class="{'edit-mode':isEditMode}">
    <div class="grid"
         :style="{
          'align-items':align,
          'grid-template-rows':rows,
          'grid-template-columns':columns,
          'gap':gap
    }">
      <div class="component" v-for="(c, index) in children" :key="c.id">
        <vpb-component :component="c" :index="index" :post-name="postName"></vpb-component>
      </div>
    </div>
  </div>


</template>

<script>

import {toRefs} from "vue";
import VpbAddComponent from "@/vpb/components/pagebuilder/VpbAddComponent";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import ComponentProps from "@/vpb/models/RequiredProps";

export default {
  components: {VpbComponent, VpbAddComponent},
  props: {...ComponentProps, rows: String, columns: String, gap: String,align:String},
  name: "VpbRow",
  setup(props) {
    const {children, id, postName, isEditMode, rows, columns, gap,align} = toRefs(props)
    return {children, id, postName, isEditMode, rows, columns, gap, align}
  }
}
</script>

<style scoped>
.edit-mode {
  padding: 2px;
}

.grid {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 33% 33% 33%;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

.edit-mode:hover > .editor {
  display: inherit;
}

.edit-mode .editor {
}

</style>
<template>
  <div class="wrap" :style="{
   'background-color':backgroundColor,
  'margin': margin,
  'padding':padding,
  'color':textColor,
  'border-radius':borderRadius,
  'border-color':borderColor
  }" :class="{'edit-mode':isEditMode}">
    <div class="column">
      <div class="component" v-for="(c, index) in children" :key="c.id">
        <vpb-component :component="c" :index="index" :post-name="postName"></vpb-component>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from "vue";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import ComponentProps from "@/vpb/models/RequiredProps";
import {stylingProps, stylingPropDefinitions} from "@/vpb/models/StylingProps";
import usePropEditorValues from "@/vpb/composables/usePropEditorValues";

export default {
  name: "VpbColumn",
  components: {VpbComponent},
  props: {...ComponentProps, ...stylingProps},
  setup(props) {
    const {cssFourSidesValue} = usePropEditorValues()
    const {
      children,
      id,
      postName,
      isEditMode,
      backgroundColor,
      margin,
      padding,
      textColor,
      borderRadius,
      borderColor
    } = toRefs(props)

    return {
      children,
      id,
      postName,
      isEditMode,
      backgroundColor,
      textColor,
      borderColor: borderColor,
      borderRadius: cssFourSidesValue(borderRadius.value),
      margin: cssFourSidesValue(margin.value),
      padding: cssFourSidesValue(padding.value)
    }
  }
}
</script>

<style scoped>
.dragAreaActive {
  border-color: #6fc2f1;
  color: #6fc2f1;
}

.wrap {
  flex-grow: 1;
}
</style>
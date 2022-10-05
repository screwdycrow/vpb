<template>
  <div class="wrap" :style="{
   'background-color':backgroundColor,
  'margin': margin,
  'padding':padding,
  'color':textColor,
  'border-width': borderWidth,
  'border-radius':borderRadius,
  'border-color':borderColor
  }">
    <slot></slot>
  </div>
</template>

<script>
import {stylingProps} from "@/vpb/models/StylingProps";
import usePropEditorValues from "@/vpb/composables/usePropEditorValues";
import {toRefs,computed} from "vue";

export default {
  name: "VpbStyleWrapper",
  props: {...stylingProps},
  setup(props) {
    const {cssFourSidesValue} = usePropEditorValues()
    const {
      backgroundColor,
      margin,
      padding,
      textColor,
      borderRadius,
      borderColor,
      borderWidth
    } = toRefs(props)

    return {
      backgroundColor,
      textColor,
      borderColor: borderColor,
      borderWidth: computed(()=> cssFourSidesValue(borderWidth.value)),
      borderRadius: computed( () => borderRadius.value.join(' ')),
      margin: computed(()=> cssFourSidesValue(margin.value)),
      padding: computed(() => cssFourSidesValue(padding.value))
    }
  }
}
</script>

<style scoped>

</style>
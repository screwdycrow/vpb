<template>
  <div class="wrap" :style="{
   'background-color':backgroundColor,
  'margin': margin,
  'padding':padding,
  'color':fontColor,
  'font-weight':fontWeight,
  'font-size':fontSize,
  'border-width': borderWidth,
  'border-radius':borderRadius,
  'border-color':borderColor
  }">
    <slot></slot>
  </div>
</template>

<script>
import {stylingProps, useStylingProps} from "@/vpb/composables/StylingProps";
import usePropEditorValues from "@/vpb/composables/usePropEditorValues";
import {toRefs, computed} from "vue";
import {useTextProps} from "@/vpb/composables/TextProps";

useTextProps('inherit', 'inherit', '')
export default {
  name: "VpbStyleWrapper",
  props: {
    ...useStylingProps(
        'transparent',
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        'transparent',
    ),
    ...useTextProps('inherit', 'inherit', '')
  },
  setup(props) {
    const {cssFourSidesValue} = usePropEditorValues()
    const {
      backgroundColor,
      margin,
      padding,
      fontSize,
      fontColor,
      borderRadius,
      borderColor,
      fontWeight,
      borderWidth
    } = toRefs(props)

    return {
      backgroundColor,
      fontColor,
      fontSize,
      fontWeight,
      borderColor: borderColor,
      borderWidth: computed(() => cssFourSidesValue(borderWidth.value)),
      borderRadius: computed(() => borderRadius.value.join(' ')),
      margin: computed(() => cssFourSidesValue(margin.value)),
      padding: computed(() => cssFourSidesValue(padding.value))
    }
  }
}
</script>

<style scoped>

</style>
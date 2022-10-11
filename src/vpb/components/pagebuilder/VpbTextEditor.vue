<template>
  <div class='vpb-text'
       :style="{
      'font-size': fontSize ,
      'color':fontColor,
      'font-weight': fontWeight,
      'display': 'block'
      }"
       v-html="content"
  >
  </div>
</template>

<script>
import {useTextProps} from "@/vpb/composables/TextProps";
import VpbStyleWrapper from "@/vpb/components/pagebuilder/VpbStyleWrapper";
import {toRefs} from "vue";

export default {
  components: {VpbStyleWrapper},
  props: {
    content: {type: String, default: 'This is a simple dummy text used for typography'},
    ...useTextProps('inherit', 'inherit', 'inherit')
  },
  name: "VpbTextEditor",
  setup(props) {
    const {text, fontSize, fontColor, fontWeight} = toRefs(props)
    return {
      text,
      fontSize,
      fontColor,
      fontWeight
    }
  }
}
</script>

<style scoped>

</style>
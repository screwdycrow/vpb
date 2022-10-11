<template>
  <h1 :contenteditable="isEditMode"
      :style="{
      'font-size': fontSize ,
      'color':fontColor,
      'font-weight': fontWeight,
      'display': 'block'
      }"
      @blur="onInput($event)" v-text="text">  </h1>
</template>

<script>
import {toRefs} from "vue";
import {storeToRefs} from "pinia";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import ComponentProps from "@/vpb/models/RequiredProps";
import {useTextProps} from "@/vpb/composables/TextProps";


export default {
  props: {
    ...ComponentProps,
    ...useTextProps('24px', 'inherit', 'inherit'),
    text: String,
  },
  name: "Title",
  setup(props) {
    let {activeComponent} = storeToRefs(useVpbEditorStore())

    const onInput = (e) => {
      activeComponent.value.props.text = e.target.innerText
      e.target.blur()
    }
    return {...toRefs(props), onInput, activeComponent}
  }
}
</script>

<style scoped>

</style>
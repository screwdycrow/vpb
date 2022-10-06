<template>
  <h1 :contenteditable="isEditMode"  style="font-size: 2em; font-weight: bold; display: inline-block"  @input="onInput($event)"> {{text}} </h1>
</template>

<script>
import {toRefs} from "vue";
import {storeToRefs} from "pinia";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import ComponentProps from "@/vpb/models/RequiredProps";


export default {
  props: {
    ...ComponentProps,
    text: String,
  },
  name: "Title",
  setup(props){
    let {activeComponent} = storeToRefs(useVpbEditorStore())

    const onInput = (e)=>{
      activeComponent.value.props.text =  e.target.innerText
      e.target.focus()
    }
    return {...toRefs(props),onInput,activeComponent}
  }
}
</script>

<style scoped>

</style>
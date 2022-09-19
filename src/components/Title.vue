<template>
  <h1 :contenteditable="isEditMode" style="font-size: 2em; font-weight: bold" @input="onInput($event)"> {{text}} </h1>
</template>

<script>
import {toRefs} from "vue";
import {storeToRefs} from "pinia";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";

export default {
  props: {
    id: String,
    postName: String,
    isEditMode:Boolean,
    text:String,
  },
  name: "Title",
  setup(props){
    let {activeComponent} = storeToRefs(useVpbEditorStore())

    const onInput = (e)=>{
      activeComponent.value.props.text =  e.target.innerText
    }
    return {...toRefs(props),onInput,activeComponent}
  }
}
</script>

<style scoped>

</style>
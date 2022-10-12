<template>
  <div class="">
    <label class="text-gray-500"> {{label}} </label>
    <select class="w-full border border-gray-200 bg-white rounded-lg px-1 py-2" @change="handleInput" v-model="inputValue">
      <option v-for="item in items" :value="item[optionKey]"> {{ item[optionLabel] }}</option>
    </select>
  </div>
</template>

<script>
import {ref, toRefs} from "vue";

export default {
  name: "VpbSelect",
  props: {
    items: Array,
    modelValue: String,
    optionKey: String,
    optionLabel: String,
    label: String,
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const {items, modelValue, label, optionKey, optionLabel} = toRefs(props)
    let inputValue = ref(modelValue.value)
    const handleInput = (input) => {
      emit('update:modelValue', inputValue.value)
    }
    return {items, label, optionKey, optionLabel, handleInput,inputValue}
  }
}
</script>

<style scoped>

</style>
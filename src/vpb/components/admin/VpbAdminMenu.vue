<template>
<!-- tailwind css dropdown -->
    <div @focusout="hideDropdown()">
      <div class=" bg-white rounded-lg shadow-lg  flex flex flex-col" v-if="showOptions">
        <div class="bg-white round lg shadow-lg px-4 py-2 mb-2" style="min-height: 400px">
          {}}
        </div>
        <a @click="onOptionClick(post) " v-for="post in editablePosts" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
          Edit {{post.title}}
        </a>
        <a :href="adminPath" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
          Admin
        </a>
      </div>
        <div class="bg-blue-500 text-white rounded-lg shadow-lg mt-2 mb-2 p-1 flex justify-between items-center" @click="toggleDropdown()">
            <span class="ml-2">Page Builder Options</span>
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </div>
      </div>

</template>

<script>
import {ref, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default {
  name: "VpbAdminMenu",
  props: {
    adminPath: String,
  },
  setup(props, ctx){
    const postEditor = usePostEditor();
    const  { editablePosts, activePost} = toRefs(postEditor);
    const {adminPath} = toRefs(props)
    let showOptions = ref(false);

    const showDropdown = ()=>{
      showOptions.value = true;
    }
    const hideDropdown = ()=>{
      showOptions.value = false;
    }
    const toggleDropdown = ()=>{
      if (!showOptions.value){
        showDropdown()
      }else{
        hideDropdown()
      }
    }
    const onOptionClick = (post)=>{
      postEditor.setSelectedActive(post.name)
    }
    return {editablePosts, activePost, showOptions, hideDropdown, toggleDropdown , onOptionClick, adminPath}
  }
}
</script>

<style scoped>

</style>
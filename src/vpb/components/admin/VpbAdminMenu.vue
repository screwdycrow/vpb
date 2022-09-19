<template>
  <div @focusout="hideDropdown()">
    <div class=" bg-white shadow-lg flex flex flex-col" v-if="showOptions">
      <slot name="expand"></slot>
      <template v-for="post in editablePosts">
        <a @click="onOptionClick(post)" v-if="activePostName !== post.name "
           class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
          <span> {{ activePost ? 'Switch to' : 'Edit' }}</span> {{ post.title }}
        </a>
      </template>
      <a :href="adminPath"
         class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
        Admin
      </a>
    </div>
    <div class="bg-blue-500 text-white rounded-lg shadow-lg mt-2 mb-2 p-1 flex justify-between items-center"
         @click="toggleDropdown()">
      <span class="ml-2">Page Builder Options</span>
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"/>
      </svg>
    </div>
  </div>
</template>
<script>
import {computed, ref, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
import VpbComponentTypes from "@/vpb/components/admin/VpbComponentTypes";

export default {
  name: "VpbAdminMenu",
  components: {VpbComponentTypes},
  props: {
    adminPath: String,
  },
  setup(props, ctx) {
    const postEditor = usePostEditor();
    const {editablePosts, activePost,activeComponent} = toRefs(postEditor);
    const {adminPath} = toRefs(props)
    let showOptions = ref(false);

    const showDropdown = () => {
      showOptions.value = true;
    }
    const hideDropdown = () => {
      showOptions.value = false;
    }
    const toggleDropdown = () => {
      if (!showOptions.value) {
        showDropdown()
      } else {
        hideDropdown()
      }
    }
    const activePostName = computed(() => {
      return activePost.value ? activePost.value.name : null;
    })
    const onOptionClick = (post) => {
      postEditor.setSelectedActive(post.name)
    }
    return {
      activeComponent,
      editablePosts: computed(()=>Array.from(editablePosts.value.values())),
      activePost,
      showOptions,
      hideDropdown,
      toggleDropdown,
      onOptionClick,
      adminPath,
      activePostName
    }
  }
}
</script>

<style scoped>

</style>
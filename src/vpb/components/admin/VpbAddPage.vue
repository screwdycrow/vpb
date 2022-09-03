<template>
  <div class="fixed inset-0 z-10 overflow-auto" style="background: #222222aa">
    <div class="flex items-center justify-center min-h-screen min-w-50 ">
      <div class="bg-white rounded-lg shadow-xl px-5 py-5">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold"> Add Page </h1>
          <button @click="onClose()" class="hover:bg-gray-200 font-bold py-1 px-3 rounded-full">
            <!-- close icon -->
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
        <div class="mt-5">
          <div class="flex justify-between items-center">
            <label class="text-gray-700 font-bold mr-3"> Title: </label>
            <input class="w-full border border-gray-200 rounded-lg px-2 py-2" type="text" placeholder="Display Title"
                   v-model="post.title">
          </div>
          <div class="flex justify-between items-center mt-3">
            <label class="text-gray-700 font-bold mr-2"> Name: </label>
            <input class="w-full border border-gray-200 rounded-lg px-2 py-2" type="text" placeholder="Slug"
                   v-model="post.name">
          </div>
          <div class="flex justify-between items-center mt-3">
            <label class="text-gray-700 font-bold mr-3"> Path: </label>
            <input class="w-full border border-gray-200 rounded-lg px-2 py-2" type="text" placeholder="path"
                   v-model="post.path"/>
          </div>
          <!--tailwind select -->
          <div class="flex justify-between items-center mt-3">
            <label class="text-gray-700 font-bold mr-3"> Template: </label>
            <select class="w-full border border-gray-200 rounded-lg px-2 py-2"  v-model="post.template">
              <option v-for="template in templateNames" :value="template"> {{ template }}</option>
            </select>
          </div>
        </div>
        <!--tailwind css action footer-->
        <div class="flex justify-between items-center mt-3">
          <button @click="onSave()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import VpbPost from "@/vpb/views/VpbPost";
import {storeToRefs} from "pinia/dist/pinia";

export default {
  name: "VpbAddPage",
  //setup
  emits: ['close', 'save'],
  setup(props, {emit, router}) {
    const vpbAdminStore = useVpbAdminStore()
    const {templateNames} = storeToRefs(vpbAdminStore)
    const templateByName = computed((name)=>vpbAdminStore.templateByName(name))
    let post = ref({
      title: '',
      name: '',
      path: '',
      type: 'page',
      content: [],
      settings: {},
      template: templateNames.value[0]
    })
    const onClose = () => {
      emit('close')
    }
    const onSave = () => {
      console.log(post.value)
      vpbAdminStore.addPost(post.value).then(
          () => {
            router.addRoute({
                  name: post.value.name,
                  component: templateByName(post.value.template),
                  path: post.value.path,
                  props: {
                    name: post.value.name
                  }
                }
            )
            emit('save')
          }
      )
    }
    return {
      post,
      templateNames,
      onClose,
      onSave
    }
  }
}
</script>

<style scoped>

</style>
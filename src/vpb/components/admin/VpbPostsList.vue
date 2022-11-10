<template>
  <div class=" mt-5 mr-5">
    <div class="flex justify-between ">
      <h2 class="text-xl font-bold flex "> Pages</h2>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
        @click="addPage = true; ">
        Add
      </button>
      <vpb-add-page @close="addPage=false" v-if="addPage"></vpb-add-page>
      </div>
    <div class="mt-3">
      <ul class="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
        <li class="px-6 py-2 border-b border-gray-200 w-full flex justify-between space-y" v-for="p in pages">
          <div class="flex w-full justify-between align-middle ">
            <div class="flex flex-col">
              <span>{{p.title}}</span> <span class="text-gray-400">{{p.path}}</span>
            </div>
            <div class="flex">
              <button class="hover:bg-gray-300 text-white font-bold py-3 px-3 rounded-full"
                      @click="editPage = true; editPageId = p.id;">
                <svg class="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02
                  0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>
              <router-link :to="p.path"  class="hover:bg-gray-300 text-white font-bold py-3 px-3 rounded-full">
                <svg class="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76
                  0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </router-link>
              <button @click="removePost(p)" class="hover:bg-gray-300 text-white font-bold py-3 px-3 rounded-full">
                <svg class="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import VpbAddPage from "@/vpb/components/admin/VpbAddPage";
import {ref} from "vue";
import {storeToRefs} from "pinia/dist/pinia";

export default {
  name: "VpbPostsList",
  components: {VpbAddPage},
  setup(){
    const adminStore =  useVpbAdminStore()
    const { pages } = storeToRefs(adminStore)
    const removePost = function (post) {
      adminStore.removePost(post)
    }
    let addPage = ref(false);
    return {
      pages,
      addPage,
      removePost
    }
  }
}
</script>

<style scoped>

</style>
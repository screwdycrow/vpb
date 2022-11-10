<template>
  <vpb-source @close="addSource=false" v-if="addSource"></vpb-source>
  <vpb-source @close="editSource = null" v-if="editSource!==null" :source-name="editSource"></vpb-source>
  <div class=" mt-5 mr-5">
    <div class="flex justify-between ">
      <h2 class="text-xl font-bold flex "> Sources </h2>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
              @click="addSource = true; ">
        Add
      </button>
    </div>
    <div class="mt-3">
      <ul class="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
        <li class="px-6 py-2 border-b border-gray-200 w-full flex justify-between space-y"
            v-for="[name, source] in sources">
          <div class="flex w-full justify-between align-middle ">
            <div class="flex items-center">
              <div class="mr-4 font-bold" :class="methodColors[source.method]">
                {{source.method}}
              </div>
              <div class="flex flex-col">
                <span>{{ source.label }}</span>
                <span class="text-gray-400"> {{axiosInstances[source.axiosInstance].defaults.baseURL}}{{ source.url }}</span>
              </div>
            </div>
            <div class="flex">
              <button @click="editSource = name" class="hover:bg-gray-300 text-white font-bold py-3 px-3 rounded-full">
                <svg class="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02
                  0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button @click="removeSource(source)" class="hover:bg-gray-300 text-white font-bold py-3 px-3 rounded-full">
                <svg class="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
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
import {storeToRefs} from "pinia";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {ref} from "vue";
import VpbSource from "@/vpb/components/admin/VpbSource";

export default {
  name: "VpbSourceList",
  components: {VpbSource},
  setup(props) {
    let addSource = ref(false);
    const adminStore = useVpbAdminStore();
    const editSource = ref(null);
    const methodColors={
      GET: "text-green-500",
      POST: "text-blue-500",
      PUT: "text-yellow-500",
      DELETE: "text-red-500"
    }
    const {sources, axiosInstances} = storeToRefs(adminStore)
    const removeSource = (source) => {
      adminStore.removeSource(source)
    }
    return {sources, addSource, removeSource,axiosInstances,methodColors,editSource}
  }
}
</script>

<style scoped>

</style>
<template>
    <div class="fixed inset-0 z-10 overflow-auto" style="background: #222222aa">
      <div class="flex items-center justify-center min-h-screen min-w-50 ">
        <div class="bg-white rounded-lg shadow-xl px-5 py-5">
          <div class="flex justify-between items-center">
            <h1 class="text-xl font-bold"> Add Source </h1>
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
              <label class="text-gray-700 font-bold mr-3"> Label: </label>
              <input class="w-full border border-gray-200 rounded-lg px-2 py-2" type="text" placeholder="Display Title"
                     v-model="source.label">
            </div>
            <div class="flex justify-between items-center mt-3">
              <label class="text-gray-700 font-bold mr-2"> Name: </label>
              <input class="w-full border border-gray-200 rounded-lg px-2 py-2" type="text" placeholder="Slug"
                     v-model="source.name">
            </div>
            <div class="flex justify-between items-center mt-3">
              <label class="text-gray-700 font-bold mr-3"> Url: </label>
              <input class="w-full border border-gray-200 rounded-lg px-2 py-2" type="text" placeholder="path"
                     v-model="source.url"/>
            </div>
            <div class="flex justify-between items-center mt-3">
              <label class="text-gray-700 font-bold mr-3"> Method: </label>
              <select class="w-full border border-gray-200 rounded-lg px-2 py-2"  v-model="source.method">
                <option v-for="method in methods" :value="method"> {{ method }}</option>
              </select>
            </div>
            <!--tailwind select -->
            <div class="flex justify-between items-center mt-3">
              <label class="text-gray-700 font-bold mr-3"> Axios Instance: </label>
              <select class="w-full border border-gray-200 rounded-lg px-2 py-2"  v-model="source.axiosInstance">
                <option v-for="axiosInstance in axiosNames" :value="axiosInstance"> {{ axiosInstance }}</option>
              </select>
            </div>
          </div>
          <!--tailwind css action footer-->
          <div class="flex justify-between items-center mt-3">
            <button @click="onUpdate()" class="hover:bg-gray-200 font-bold py-1 px-3 rounded-full">
              Update
            </button>
            <button @click="onSave()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {storeToRefs} from "pinia";
import {computed, ref, toRefs} from "vue";
import Source from "@/vpb/models/Source";

export default {
  name: "VpbAddSource",
  emits: ['close', 'save'],
  props: {
    sourceName: String
  },
  setup(props, {emit}) {
    const vpbAdminStore = useVpbAdminStore()
    const {axiosNames,sources} = storeToRefs(vpbAdminStore)
    const methods = ['GET', 'POST', 'PUT', 'DELETE']
    //make a default source
    let source = ref({
      name: '',
      label: '',
      method: 'GET',
      url: '',
      structure:{},
      params: [],
      axiosInstance: axiosNames.value[0]
    })
    let updateMode = computed(() => {
      return props.sourceName  !== null && props.sourceName !== undefined
    })
    if(updateMode.value){
      source = sources.value.get(props.sourceName)
    }

    const onUpdate = () => {
      vpbAdminStore.updateSource(source.value)
      emit('close')
    }
    const onClose = () => {
      emit('close')
    }
    const onSave = () => {
      vpbAdminStore.addSource(source.value).then(
          () => {
            emit('save')
          }
      )
    }
    return {
      onUpdate,
      updateMode,
      source,
      axiosNames,
      onClose,
      onSave,
      methods,
    }
  }
}
</script>

<style scoped>

</style>
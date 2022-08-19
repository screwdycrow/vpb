<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 p-5 mt-3 bg-slate-100 rounded-xl">
    <div class="w-full bg-white rounded shadow flex flex-col justify-center items-center p-5 hover:bg-slate-300" v-for="c in componentTypes">
      {{c.name}}
    </div>
  </div>
  <div>
  </div>
</template>

<script>
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

export default {
  name: "VpbComponentTypes",
  setup(){
    const adminStore = useVpbAdminStore()

    return{
      componentTypes:adminStore.componentTypes
    }
  }
}
</script>

<style scoped>

</style>
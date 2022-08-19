<template>
  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
    <vpb-admin></vpb-admin>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {useStore} from "@/store";
import {mapState} from "pinia/dist/pinia";
import VpbAdmin from "@/vpb/views/VpbAdmin";

export default {
  name: 'HomeView',
  components: {
    VpbAdmin,
    HelloWorld
  },
  computed:{
    ...mapState(useStore,['title'])
  }
}
</script>

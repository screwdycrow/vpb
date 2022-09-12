<template>
  <!-- tailwind css drag and drop area -->
  <div class="column">
    <template v-for="c in childComponents">
        <div class="component-content">
          <vpb-component :component="c" :post-name="postName"  ></vpb-component>
        </div>
    </template>
    <div class="editor" v-if="isEditorActive">
      <vpb-add-component :id="id"></vpb-add-component>
    </div>
  </div>



</template>

<script>
import usePostEditor from "@/vpb/composables/usePostEditor";
import {computed, toRefs} from "vue";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import Vpb from "@/vpb/components/pagebuilder/Vpb";
import VpbAddComponent from "@/vpb/components/pagebuilder/VpbAddComponent";

export default {
  name: "VpbColumn",
  components: {VpbAddComponent, Vpb, VpbComponent},
  props: {
    id: String,
    postName:String,
    childComponents: {type:Array, required:false, default:()=>[]},
  },
  setup(props) {
    const {id,childComponents, postName} = toRefs(props);
    const postEditor = usePostEditor();
    const {isEditorActive} = toRefs(postEditor);

    return {isEditorActive, id, childComponents, postName}
  }
}
</script>

<style scoped>
.dragAreaActive {
  border-color: #6fc2f1;
  color: #6fc2f1;
}
</style>
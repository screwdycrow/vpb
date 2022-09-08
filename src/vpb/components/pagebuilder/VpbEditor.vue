<template>
  <div class="wrapper edit-mode">
    <div class="root renderer">
      <vpb-column id="root"></vpb-column>
      <template v-for="c in rootChildren">
        <div class="component">
          <div class="component-header">
            <div class="component-name">
              {{ c.id }}
            </div>
          </div>
          <!-- component content -->
          <div class="component-content">
            {{c}}
            {{classOfComponent(c)}}
            <component :is="classOfComponent(c)" :component="c" :key="c.id"></component>
          </div>
        </div>
      </template>
    </div>
    <div class="renderer">
    </div>
  </div>
</template>

<script>
import {toRefs} from "vue";
import useRenderStructure from "@/vpb/composables/useRenderStructure";
import usePostEditor from "@/vpb/composables/usePostEditor";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";

export default {
  components: {VpbColumn},
  props: {
    post: {type: Object, required: true}
  },
  name: "VpbEditor",
  setup(props) {
    const {post} = toRefs(props)
    const editorStore = useVpbEditorStore()
    const renderer = useRenderStructure(post.value)
    const {structure, rootChildren} = toRefs(renderer)

    return {structure, rootChildren, classOfComponent: renderer.getComponentClass,}
  }
}
</script>

<style scoped>
/* tailwind drag and drop area */
.drag-area {
  @apply flex justify-center items-center;
  height: 100px;
  background-color: #f5f5f5;
  border: 1px dashed #ccc;
  border-radius: 5px;
  margin-bottom: 0;
}

.drag-area__inner {
  @apply flex justify-center items-center;
  width: 100%;
  height: 100%;
}

.drag-area__inner__content {
  @apply flex justify-center items-center;
  width: 100%;
  height: 100%;
}

.drag-area__inner__content__icon {
  @apply flex justify-center items-center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
}

.drag-area__inner__content__text {
  @apply flex justify-center items-center;
  margin-left: 10px;
}

.root:hover {
  width: 100%;
  border: 2px solid cornflowerblue;
  padding:5px;
}

.edit-mode {
  min-height: 400px;
}
</style>
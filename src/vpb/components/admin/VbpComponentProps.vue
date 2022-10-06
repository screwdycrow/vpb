<template>
  <div class="component-wrap">
    <div class="flex " v-if="tabs.length>1">
      <button v-for="tabKey in tabs" @click="setTab(tabKey)" :class='{"bg-white":tab !== tabKey}'
              class="p-2 text-gray-800 flex-auto">
        {{ tabKey }}
      </button>
    </div>

    <div class="form">
      <div v-for="prop in  componentProps" class="mt-1 mb-2">
        <component v-bind="{prop}" :is="propEditorOf(prop.type).definition"
                   :key="activeComponent.id+prop.name"></component>
      </div>

    </div>
  </div>
</template>

<script>
import {computed, ref, toRefs, watch} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import Prop from "@/vpb/models/Prop";

export default {

  name: "VbpComponentProps",
  setup() {
    const {activeComponent} = usePostEditor();
    const adminStore = useVpbAdminStore();
    const tab = ref('Main')
    const componentType = computed(() => {
      return adminStore.componentTypeOf(activeComponent.value.componentType)
    })
    const propEditorOf = adminStore.propEditorOf
    const setTab = (tabName) => {
      tab.value = tabName
    }
    const componentPropsTabs = computed(() => {
      let propTabs = new Map()
      Array.from(componentType.value.props.values()).forEach(
          (prop) => {
            if (prop.tab !== undefined) {
              if (propTabs.has(prop.tab)) {
                propTabs.get(prop.tab).push(prop)
              } else {
                propTabs.set(prop.tab, [prop])
              }
            }
          }
      )
      return propTabs
    })
    const tabs = computed(() => {
      return Array.from(componentPropsTabs.value.keys())
    })
    const componentProps = computed(() => {
      if (componentPropsTabs.value.has(activeTab.value)) {
        return componentPropsTabs.value.get(activeTab.value)
      } else {
        return []
      }
    })
    const activeTab = computed(() => {
      return componentPropsTabs.value.has(tab.value)? tab.value : tabs.value[0]
    })
    return {activeComponent, componentProps, propEditorOf, tab, setTab, tabs, activeTab}
  }
}
</script>

<style scoped>
.form {
  padding: 1em;
}

.form input {
  width: 100%;
}
</style>
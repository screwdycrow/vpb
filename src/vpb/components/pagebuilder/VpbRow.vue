<template>
  <vpb-style-wrapper
      :background-color="backgroundColor"
      :font-color="fontColor"
      :border-color="borderColor"
      :border-width="borderWidth"
      :font-weight="fontWeight"
      :font-size="fontSize"
      :border-radius="borderRadius"
      :margin="margin"
      :padding="padding"
  >
    <div class="grid"
         :class="{'edit-mode':isEditMode}"
         :style="{
          'align-items':align,
          'grid-template-rows':rows,
          'grid-template-columns':columns,
          'gap':gap
    }">
      <div class="component" v-for="(c, index) in children" :key="c.id">
        <vpb-component :component="c" :index="index" :post-name="postName"></vpb-component>
      </div>
    </div>
  </vpb-style-wrapper>
</template>

<script>

import {toRefs} from "vue";
import VpbAddComponent from "@/vpb/components/pagebuilder/VpbAddComponent";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import ComponentProps from "@/vpb/models/RequiredProps";
import VpbStyleWrapper from "@/vpb/components/pagebuilder/VpbStyleWrapper";
import {useStylingProps} from "@/vpb/composables/StylingProps";
import {useTextProps} from "@/vpb/composables/TextProps";

export default {
  components: {VpbStyleWrapper, VpbComponent, VpbAddComponent},
  props: {
    ...ComponentProps, rows: String, columns: String, gap: String, align: String,
    ...useStylingProps(
        'transparent',
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        'transparent',
    ),
    ...useTextProps('inherit', 'inherit', '')
  },
  name: "VpbRow",
  setup(props) {
    return {...toRefs(props)}
  }
}
</script>

<style scoped>
.edit-mode {
  padding: 2px;
}

.grid {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 33% 33% 33%;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

.edit-mode:hover > .editor {
  display: inherit;
}

.edit-mode .editor {
}

</style>
<template>
  <vpb-style-wrapper
      :background-color="backgroundColor"
      :font-color="fontColor"
      :font-size="fontSize"
      :font-weight="fontWeight"
      :border-color="borderColor"
      :border-width="borderWidth"
      :border-radius="borderRadius"
      :margin="margin"
      :padding="padding"
  >
    <div class="column">
      <div class="component" v-for="(c, index) in children" :key="c.id">
        <vpb-component :component="c" :index="index" :post-name="postName"></vpb-component>
      </div>
    </div>
  </vpb-style-wrapper>
</template>

<script>
import {reactive, ref, toRefs} from "vue";
import VpbComponent from "@/vpb/components/pagebuilder/VpbComponent";
import ComponentProps from "@/vpb/models/RequiredProps";
import {stylingProps, stylingPropDefinitions, useStylingProps} from "@/vpb/composables/StylingProps";
import VpbStyleWrapper from "@/vpb/components/pagebuilder/VpbStyleWrapper";
import {useTextProps} from "@/vpb/composables/TextProps";

export default {
  name: "VpbColumn",
  components: {VpbStyleWrapper, VpbComponent},
  props: {
    ...ComponentProps,
    ...useStylingProps(
        'transparent',
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        ['0', '0', '0', '0'],
        'transparent',
    ),
    ...useTextProps('inherit', 'inherit', 'inherit')

  },
  setup(props) {
    return {...toRefs(props)}
  }
}
</script>

<style scoped>
.dragAreaActive {
  border-color: #6fc2f1;
  color: #6fc2f1;
}

.wrap {
  flex-grow: 1;
}
</style>
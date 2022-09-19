import {computed, onBeforeUnmount, toRefs, watch} from "vue";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";
import {onUnmounted} from "vue";
import {storeToRefs} from "pinia/dist/pinia";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

export default function (post) {

    const root = 'root'
    const vpbEditor = useVpbEditorStore()
    let structure = post.content;
    return {rootChildren, structure}
}
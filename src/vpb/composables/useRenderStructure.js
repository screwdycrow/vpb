import {computed, onBeforeUnmount, toRefs} from "vue";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";
import {onUnmounted} from "vue";
import {storeToRefs} from "pinia/dist/pinia";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

export default function (post) {

    const renderers = {
        VPB_COLUMN: 'VpbColumn',
        VPB_ROW: 'VpbRow',
    }
    const root = 'root'
    const vpbEditor = useVpbEditorStore()
    const rootChildren = computed(() => structure[root])
    let structure = {}

    const getChildrenOfRenderer = (rendererId) => {
        return post.content.filter(c => c.parent === rendererId);
    }
    const setRenderers = () => {
        const renderersResults = post.content.filter(c => c.componentType === renderers.VPB_COLUMN || c.componentType === renderers.VPB_ROW)
        renderersResults.forEach(c => {
            structure[c.id] = {}
            structure[c.id] = getChildrenOfRenderer(c.id)
        })
    }
    const setRoot = () => {
        structure[root] = {}
        structure[root] = getChildrenOfRenderer(root)
    }
    const setRenderStructure = () => {
        setRenderers();
        setRoot();
        console.log(post)
        vpbEditor.setRenderStructure(post, structure)
    }
    setRenderStructure();
    onBeforeUnmount(() => {
        vpbEditor.unsetRenderStructure(post)
    })
    return {rootChildren, structure}
}
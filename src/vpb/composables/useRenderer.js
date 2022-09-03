import {computed} from "vue";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";
import {onUnmounted} from "vue";
import {storeToRefs} from "pinia/dist/pinia";
import {useVpbEditorStore} from "@/vpb/stores/vpbEditorStore";

const renderers = {
    VPB_COLUMN: 'VpbColumn',
    VPB_ROW: 'VpbRow',
}
const root = 'root'

export default function (post){
    const vpbEditor = useVpbEditorStore()
    const rootChildren = computed(() => structure[root])
    let structure = {
        'root': [
            {
                parent: 'root',
                id: 'ccfpr-row',
                componentType: VpbRow
            }
        ],
        'ccfpr-row': [
            {
                parent: 'ccfpr-row',
                id: 'c2134asdgf',
                componentType: VpbColumn
            }
        ],
        'c2134asdgf': [
            {
                parent: 'c2134asdgf',
                id: 'title-12134',
                componentType: 'Title',
                props: {
                    heading: 'h1',
                    text: 'TestTitle'
                },
            }
        ]
    }
    const getChildrenOfRenderer = (rendererId) => {
        return post.content.filter(c => c.parent === rendererId);
    }
    const setRenderers = () => {
        const renderers = post.content.filter(c => c.componentType === renderers.VPB_COLUMN || c.componentType === renderers.VPB_ROW)
        renderers.forEach(c => {
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
        vpbEditor.setRenderStructure(post, structure)
    }
    setRenderStructure();
    onUnmounted(() => {
        vpbEditor.unsetRenderStructure(post)
    })
    return {rootChildren, structure}
}
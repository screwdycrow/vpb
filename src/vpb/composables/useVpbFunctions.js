import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import {markRaw} from "vue";
import VpbPost from "@/vpb/views/VpbPost";
import VpbPostBlank from "@/vpb/views/VpbPostBlank";

export  default ()=>{
    function registerComponentTypes(componentTypes) {
        const vpbAdminStore = useVpbAdminStore()
        componentTypes.forEach(c => {
            vpbAdminStore.addComponentType(c)
        })
    }

    function registerPropEditors(propEditors) {
        const vpbAdminStore = useVpbAdminStore()
        propEditors.forEach(propEditor => {
            vpbAdminStore.addPropEditor(propEditor)
        })
    }

    function registerTemplates(templates) {
        const vpbAdminStore = useVpbAdminStore()
        vpbAdminStore.setTemplates({
            'Default': markRaw(VpbPost),
            'Blank': markRaw(VpbPostBlank),
            ...templates ? templates : {}
        })
    }

    function registerRoutes(posts, router) {
        const vpbAdminStore = useVpbAdminStore()
        posts.forEach(p => {
            router.addRoute({
                name: p.name,
                component: vpbAdminStore.templateComponentOfName(p.template),
                path: p.path,
                props: {
                    name: p.name
                }
            })
        })
    }
    return {
        registerComponentTypes,
        registerPropEditors,
        registerTemplates,
        registerRoutes
    }
}


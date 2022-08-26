import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import VpbPost from "@/vpb/views/VpbPost";


/**
 * @param componentTypes
 * @param getPostsRequest
 * @param updatePostRequest
 * @param removePostRequest
 * @param addPostRequest
 * @returns {{install: install}}
 */
export function createVpb(
    {
        componentTypes,
        templates,
        getPostsRequest,
        updatePostRequest,
        removePostRequest,
        addPostRequest
    }) {
    return {
        install: (app, {router}) => {
            let vpbAdminStore = useVpbAdminStore();
            vpbAdminStore.setRequests({
                getPosts: getPostsRequest,
                updatePost: updatePostRequest,
                removePost: removePostRequest,
                addPost: addPostRequest
            })
            registerComponentTypes(componentTypes);
            registerTemplates(templates);
            vpbAdminStore.getPosts().then(() => {
                const pages = vpbAdminStore.pages
                registerRoutes(pages, router);
            })
        }
    }
}

function registerComponentTypes(componentTypes) {
    const vpbAdminStore = useVpbAdminStore()
    componentTypes.forEach(c => {
        registerDefinition(c)
        vpbAdminStore.addComponentType(c)
    })
}

function registerDefinition(componentType) {
    const vpbAdminStore = useVpbAdminStore()
    vpbAdminStore.setDefinition(componentType.type, componentType.definition)
}

function registerTemplates(templates) {
    const vpbAdminStore = useVpbAdminStore()
    vpbAdminStore.setTemplates({'Default': VpbPost, ...templates ? templates : {}})
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



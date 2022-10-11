// pinia store called vpbEditorStore
import {defineStore} from "pinia";
import Post from "@/vpb/models/Post";
import {reactive} from "vue";
import Component from "@/vpb/models/Component";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

import {cloneDeep} from "lodash";

export const useVpbEditorStore = defineStore('vpbEditor', {
    state: () => ({
        activeComponent: null,
        activeRendererAdd: null,
        dragging: null,
        dragOverComponentId: null,
        activePost: null,
        activePostCopy: null,
        editablePosts: new Map(),
        renderStructure: {},
        changeHistory: []
    }),
    actions: {
        setEditablePost(post) {
            this.editablePosts.set(post.name, cloneDeep(post))
        },
        unsetEditablePost(post) {
            this.editablePosts.delete(post.name)
        },
        setActivePost(post) {
            this.activePost = new Post(cloneDeep(post));
            this.activePostCopy = new Post(cloneDeep(post));
        },
        setActiveRenderAdd(renderer) {
            this.activeRendererAdd = renderer;
            this.activeComponent = null;
        },
        moveComponent(component, newParent, order) {
            const index = this.activePost.content[component.parent].findIndex(c => c.id === component.id)
            this.activePost.content[component.parent].splice(index, 1)
            component.parent = newParent
            this.activePost.content[newParent].splice(order, 0, component)
        },
        removeComponent(component) {
            let index = this.activePost.content[component.parent].findIndex(c => component.id === c.id)
            if (this.activePost.content[component.id]) delete this.activePost.content[component.id];
            this.activePost.content[component.parent].splice(index, 1)
        },

        addComponent(type, parent) {
            const adminStore = useVpbAdminStore();
            const componentType = adminStore.componentTypes.get(type)
            let props = Array.from(componentType.props.values())
            let propValues = {}
            props.forEach(p => {
                // make sure default props are not passed by reference if they are an object...
                let props = typeof p === "object" ? cloneDeep(p) : p
                propValues[props.name] = props.defaultValue
            })
            let id = Math.random().toString(36).substr(2, 9);
            const component = new Component({
                    componentType: type,
                    id: id,
                    parent: parent,
                    props: propValues
                }
            )
            if (componentType.isRenderer) {
                this.activePost.content[id] = []
            }

            if (this.activePost.content[parent] === undefined) this.activePost.content[parent] = [];
            this.activePost.content[parent].push(component)
        },
        setActiveComponent(component) {
            this.activeComponent = null;
            this.activeComponent = component;
            this.fixActiveComponent();
        },
        fixActiveComponent() {
            const adminStore = useVpbAdminStore();
            let componentProps = Object.keys(this.activeComponent.props);
            const componentType = adminStore.componentTypes.get(this.activeComponent.componentType)
            let componentTypeProps = componentType.props;
            if (this.activeComponent.props) {
                //find the difference of component props and component type props
                componentProps
                    .filter(x => !componentTypeProps.has(x))
                    .forEach(x => {
                        delete this.activePostCopy.props[x]
                    })
            }
            //find the difference of component type props and component props
            Array.from(componentTypeProps.values())
                .filter(x => !this.activeComponent.props.hasOwnProperty(x.name))
                .forEach(x => {
                    this.activeComponent.props[x.name] = typeof componentTypeProps.get(x.name).defaultValue === "object" ? cloneDeep(componentTypeProps.get(x.name).defaultValue) : componentTypeProps.get(x.name).defaultValue
                })

        },
        updateHistory(post) {
            this.history.push(cloneDeep(post))
        },
        setDragging(value) {
            this.dragging = value;
        },
        resetEditor() {
            this.activePost = null;
            this.activePostCopy = null;
        },
        setDragOverComponentId(componentId) {
            this.dragOverComponentId = componentId;
        }
    },
    getters: {
        structureOf: state => name => state.renderStructure[name],
        isDragging: state => state.dragging !== null,
        isEditorActive: state => state.activePost !== null,
    }
})
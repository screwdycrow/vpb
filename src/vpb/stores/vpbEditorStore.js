// pinia store called vpbEditorStore
import {defineStore} from "pinia";
import Post from "@/vpb/models/Post";
import {reactive} from "vue";
import Component from "@/vpb/models/Component";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

const _ = require('lodash');

export const useVpbEditorStore = defineStore('vpbEditor', {
    state: () => ({
        activeComponent: null,
        activeRendererAdd: null,
        dragging: null,
        dragOverComponentId:null,
        activePost: null,
        activePostCopy: null,
        editablePosts: new Map(),
        renderStructure: {},
        changeHistory: []
    }),
    actions: {
        setEditablePost(post) {
            this.editablePosts.set(post.name, _.cloneDeep(post))
        },
        unsetEditablePost(post) {
            this.editablePosts.delete(post.name)
        },
        setActivePost(post) {
            this.activePost = new Post(_.cloneDeep(post));
            this.activePostCopy = new Post(_.cloneDeep(post));
        },
        setActiveRenderAdd(renderer) {
            this.activeRendererAdd = renderer;
            this.activeComponent = null;
        },
        moveComponent(component, newParent,order) {
            console.log(component, newParent);
            const index = this.activePost.content[component.parent].findIndex(c => c.id === component.id)
            this.activePost.content[component.parent].splice(index, 1)
            component.parent = newParent
            this.activePost.content[newParent].splice(order, 0, component)
        },

        addComponent(type, parent) {
            const adminStore = useVpbAdminStore();
            const componentType = adminStore.componentTypes.get(type)
            let props = Array.from(componentType.props.values())
            let propValues = {}
            props.forEach(p=>{
                propValues[p.name] = p.default
            })
            let id = Math.random().toString(36).substr(2, 9);
            const component = new Component({
                    componentType: type,
                    id: id,
                    parent: parent,
                    props: propValues
                }
            )
            if(componentType.isRenderer) {
                this.activePost.content[id] = []
            }

            if (this.activePost.content[parent] === undefined) this.activePost.content[parent] = [];
            this.activePost.content[parent].push(component)
        },
        setActiveComponent(component){
            this.activeComponent = component;
        },
        updateHistory(post) {
            this.history.push(_.cloneDeep(post))
        },
        setDragging(value) {
            this.dragging = value;
        },
        resetEditor() {
            this.activePost = null;
            this.activePostCopy = null;
        },
        setDragOverComponentId(componentId){
            this.dragOverComponentId = componentId;
        }
    },
    getters: {
        structureOf: state => name => state.renderStructure[name],
        isDragging: state => state.dragging !== null,
        isEditorActive: state => state.activePost !== null,
    }
})
// pinia store called vpbEditorStore
import {defineStore} from "pinia";
import Post from "@/vpb/models/Post";
import {reactive} from "vue";
import Component from "@/vpb/models/Component";
import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";

const _ = require('lodash');


export const useVpbEditorStore = defineStore('vpbEditor', {
    state: () => ({
        activePostName: null,
        activeComponent: null,
        activeRendererAdd:null,
        dragging:null,
        activePost: null,
        activePostCopy: null,
        editablePosts: [],
        renderStructure: new Map()
    }),
    actions: {
        setEditablePost(post) {
            if (this.editablePosts.findIndex(p => p.name === post.name) === -1) {
                this.editablePosts.push({name: post.name, title: post.title});
            }
        },
        setRenderStructure(post, structure) {
            this.renderStructure.set(post.name, structure)
        },
        unsetRenderStructure(post) {
            this.renderStructure.delete(post.name)
        },
        unsetEditablePost(post) {
            let index = this.editablePosts.findIndex(p => p.name === post.name);
            if (index > -1) {
                this.editablePosts.splice(index, 1);
            }
        },
        setActivePost(post) {
            this.activePost = new Post(_.cloneDeep(post));
            this.activePostCopy = new Post(_.cloneDeep(post));
        },
         setActiveRenderAdd(renderer){
             this.activeRendererAdd = renderer;
        },
        addComponent(type,parent,order) {
            const adminStore = useVpbAdminStore();
            let props = adminStore.componentTypes.find(c=> c.type === type).props
            let propValues = {}
            for (const prop in props){
                propValues[name] = prop.default
            }
            //generate random alphanumeric string
            let id = Math.random().toString(36).substr(2, 9);

            const component = new Component({
                    componentType: type,
                    id:id ,
                    parent: parent,
                    order: order,
                    props:propValues
                }
            )
            console.log(component);
            this.activePost.content.push(component)
        },
        setDragging(value){
          this.dragging = value;
        },
        resetEditor() {
            this.activePost = null;
            this.activePostCopy = null;
        }
    },
    getters: {
        structureOf: state => name => state.renderStructure.get(name),
        isDragging: state => state.dragging !== null,
        isEditorActive: state => state.activePost !== null,
    }
})
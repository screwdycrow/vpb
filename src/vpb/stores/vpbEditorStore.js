// pinia store called vpbEditorStore
import {defineStore} from "pinia";
import Post from "@/vpb/models/Post";
import {reactive} from "vue";

const _ = require('lodash');

export const useVpbEditorStore = defineStore('vpbEditor', {
    state: () => ({
        activePostName: null,
        activeComponent: null,
        activePost: null,
        activePostCopy: null,
        editablePosts: [],
        renderStructure: {}
    }),
    actions: {
        setEditablePost(post) {
            if (this.editablePosts.findIndex(p => p.name === post.name) === -1) {
                this.editablePosts.push({name: post.name, title: post.title});
            }
        },
        setRenderStructure(post, structure) {
            this.renderStructure[post.name] = _.cloneDeep(structure);
        },
        unsetRenderStructure(post) {
            delete this.renderStructure[post.name];
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
        resetEditor() {
            this.activePost = null;
            this.activePostCopy = null;
        }
    },
    getters: {
        isEditorActive: state => state.activePost !== null,
    }
})
import Post from "@/vpb/models/Post";
import ComponentType from "@/vpb/models/ComponentType";
import Prop from "@/vpb/models/Prop";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import {defineStore} from "pinia";
import VpbPost from "@/vpb/views/VpbPost";

const _ = require('lodash');
export const useVpbAdminStore = defineStore('vpbAdmin', {
    state: () => ({
        posts: [],
        loading: false,
        requests: {
            /**
             * @desc The function that will be called to fetch the posts.
             * @returns {Promise<void>}
             */
            getPosts: () => {
                return Promise.resolve()
            },
            /**
             * @desc The function that will be called to update a post.
             * @returns {Promise<Post>}
             * @param {Post} post
             */
            updatePost: (post) => {
                return Promise.resolve(post)
            },
            /**
             * @desc The function that will be called to delete the posts.
             * @param {Post} post
             * @returns {Promise<void>}
             */
            removePost: (post) => {
                return Promise.resolve()
            },
            /**
             * @desc The function that will be called to add the post.
             * @param {Post} post
             * @returns {Promise<Post>}
             *
             */
            addPost: (post) => {
                return Promise.resolve(post)
            }
        },
        templates: {
            'Post': VpbPost,
        },
        propEditors: new Map(),
        componentTypes: new Map(),
    }),
    actions: {
        getPosts() {
            this.loading = true;
            return this.requests.getPosts()
                .then(
                    posts => {
                        this.setPosts(posts.map(p => new Post(p)))
                        return Promise.resolve(this.posts)
                    })
                .finally(() => {
                    this.loading = false;
                })
        },

        updatePost(post) {
            this.loading = true;
            return this.requests.updatePost(post)
                .then(post => {
                    let index = this.posts.findIndex(p => p.name === post.name)
                    this.posts[index] = post
                })
                .finally(() => {
                    this.loading = false;
                })
        },

        removePost(post) {
            this.loading = true
            return this.requests.removePost(post).then(() => {
                this.posts.splice(this.posts.findIndex(p => p.name === post.name), 1)
            }).catch(err => {
                console.log(err)
            }).then(() => {
                return Promise.resolve()
            }).finally(() => this.loading = false)
        },

        addPost(post) {
            this.loading = true;
            return this.requests.addPost(post)
                .then(
                    post => {
                        this.posts.push(post)
                        return Promise.resolve(post)
                    })
                .finally(() => {
                    this.loading = false
                })
        },
        addComponentType(component) {
            this.componentTypes.set(component.type, component)
        },
        addPropEditor(propEditor){
          this.propEditors.set(propEditor.type, propEditor)
        },
        setTemplates(templates) {
            this.templates = templates
        },
        setRequests(requests) {
            this.requests = requests
        },
        setPosts(posts) {
            this.posts = _.cloneDeep(posts)
        },
    },
    getters: {
        pages: state => state.posts.filter(p => p.type === 'page'),
        postsOfType: (state) => (type) => state.posts.filter(p => p.type === type),
        templateComponentOfName: (state) => (name) => state.templates[name],
        componentTypeOf:(state) => (type) =>state.componentTypes.get(type),
        propEditorOf:(state) => (type) => state.propEditors.get(type),
        propEditorsArray:(state) => Array.from(state.propEditors.values()),
        componentTypesArray:(state) => Array.from(state.componentTypes.values()),
        templateNames: (state) => Object.keys(state.templates),
        postOfName: (state) => (name) => state.posts.find(p => p.name === name),
    }


})
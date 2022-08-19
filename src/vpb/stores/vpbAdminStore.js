import Post from "@/vpb/models/Post";
import ComponentType from "@/vpb/models/ComponentType";
import Prop from "@/vpb/models/Prop";
import VpbRow from "@/vpb/components/VpbRow";
import {defineStore} from "pinia";
import VpbPost from "@/vpb/views/VpbPost";

const _ = require('lodash');
export const useVpbAdminStore = defineStore('vpbAdmin', {
    state: () => ({
        posts: [],
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

        componentTypes: [],
        componentDefinitions: {}
    }),
    actions: {
        getPosts() {
            return this.requests.getPosts().then(
                posts => {
                    this.setPosts(posts.map(p => new Post(p)))
                    return Promise.resolve(this.posts)
                })
        },
        updatePost(post) {
            // find post in store and update it
            return this.requests.updatePost(post).then(post => {
                let index = this.posts.findIndex(p => p.name === post.name)
                this.posts[index] = post
            });
        },
        removePost(post) {
            return this.requests.removePost(post).then(() => {
                this.posts.splice(this.posts.findIndex(p => p.name === post.name), 1)
            }).catch(err => {
                console.log(err)
            }).then(() => {
                return Promise.resolve()
            })
        },
        addPost(post) {
            return this.requests.addPost(post).then(
                post => {
                    this.posts.push(post)
                    return Promise.resolve(post)
                });
        },
        setComponentTypes(types) {
            this.componentTypes = _.cloneDeep(types)
        },
        addComponentType(component) {
            this.componentTypes.push(_.cloneDeep(component))
        },
        setDefinition(name, object) {
            if (this.componentDefinitions[name] === undefined) {
                this.componentDefinitions[name] = object
            }
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
        componentOfName: (state) => (name) => state.componentDefinitions[name],
        templateNames: (state) => Object.keys(state.templates),
        postOfName: (state) => (name) => state.posts.find(p => p.name === name),
    }


})
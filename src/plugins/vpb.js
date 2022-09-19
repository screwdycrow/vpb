import {createVpb} from "@/vpb";
import ComponentType from "@/vpb/models/ComponentType";
import Prop from "@/vpb/models/Prop";
import Post from "@/vpb/models/Post";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import Title from "@/components/Title";

export default createVpb({
    componentTypes: [
        new ComponentType({
            type: 'Title',
            definition: Title,
            name: 'Title',
            isRenderer: false,
            icon: 'mdi-table',
            description: 'A basic title',
            props: [new Prop({
                name:'text',
                type: 'text',
                label: 'Text',
                defaultValue: 'title'
            })]
        }),
        new ComponentType({
            type: 'Row',
            definition: VpbRow,
            name: 'Row',
            isRenderer: true,
            description: 'A basic wrapper',
            props: []
        }),
    ],
    addPostRequest: (post) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //check if posts in local storage
                let posts = JSON.parse(localStorage.getItem('posts')) || [];
                posts.push(post)
                localStorage.setItem('posts', JSON.stringify(posts))
                resolve(post)
            }, 500)
        })
    },
    updatePostRequest: (post) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let posts = JSON.parse(localStorage.getItem('posts'))
                let index = posts.findIndex(p => p.name === post.name)
                posts[index] = post
                localStorage.setItem('posts', JSON.stringify(posts))
                resolve(posts[index])
            }, 500)
        })
    },
    removePostRequest: (post) => {
        //delete a post from local storage
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let posts = JSON.parse(localStorage.getItem('posts'))
                let index = posts.findIndex(p => p.name === post.name)
                posts.splice(index, 1)
                localStorage.setItem('posts', JSON.stringify(posts))
                resolve()
            }, 500)
        })
    },
    getPostsRequest: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //check if posts are in local storage
                if (localStorage.getItem('posts') !== null) {
                    resolve(JSON.parse(localStorage.getItem('posts')))
                } else {
                    resolve([])
                }
            }, 500)
        })

    }
})

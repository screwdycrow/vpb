import {createVpb} from "@/vpb";
import ComponentType from "@/vpb/models/ComponentType";
import Prop from "@/vpb/models/Prop";
import PropEditor from "@/vpb/models/PropEditor";
import Title from "@/components/Title";
import VpbPostBlank from "@/vpb/views/VpbPostBlank";
import {usePropTextDefinition} from "@/vpb/composables/TextProps";
import DataTable from "@/vpbDatatables/components/DataTable";
import DataTableColumnEditor from "@/vpbDatatables/editors/DataTableColumnEditor";

export default createVpb({

    templates: {
        'Blank': VpbPostBlank
    },
    propEditors: [
    ],
    componentTypes: [
        new ComponentType({
            type: 'Title',
            definition: Title,
            name: 'Title',
            isRenderer: false,
            icon: 'mdi-format-title',
            description: 'A basic title',
            props: [
                new Prop({
                    name: 'text',
                    type: 'text',
                    label: 'Text',
                    defaultValue: 'title'
                }),
                ...usePropTextDefinition('26px', 'inherit', 'inherit')
            ],
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

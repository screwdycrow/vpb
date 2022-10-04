import {createVpb} from "@/vpb";
import ComponentType from "@/vpb/models/ComponentType";
import Prop from "@/vpb/models/Prop";
import Post from "@/vpb/models/Post";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import Title from "@/components/Title";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";
import PropEditor from "@/vpb/models/PropEditor";
import VpbPropTextField from "@/vpb/components/propEditors/VpbPropTextField";
import VpbPropColor from "@/vpb/components/propEditors/VpbPropColor";
import {stylingPropDefinitions} from "@/vpb/models/StylingProps";
import VpbCssFourSidesField from "@/vpb/components/propEditors/VpbCssFourSidesField";
import VpbPostBlank from "@/vpb/views/VpbPostBlank";

export default createVpb({

    templates: {
        'Blank': VpbPostBlank
    },
    propEditors: [
        new PropEditor({
            type: 'text',
            label: 'Text Input',
            definition: VpbPropTextField
        }),
        new PropEditor({
            type: 'color',
            label: 'Color Input',
            definition: VpbPropColor
        }),
        new PropEditor({
            type: 'cssFourSides',
            label: 'Top Left Bottom Right',
            definition: VpbCssFourSidesField
        })
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
                })]
        }),
        new ComponentType({
            type: 'Row',
            definition: VpbRow,
            icon: 'mdi-table',
            name: 'Row Renderer',
            isRenderer: true,
            description: 'A basic wrapper that renders components in a row ',
            props: [
                ...stylingPropDefinitions,
                new Prop({
                    type: 'text',
                    name: 'align',
                    label: 'Align Items',
                    defaultValue: 'stretch'
                }),
                new Prop({
                    name: 'rows',
                    type: 'text',
                    label: 'Rows',
                    defaultValue: '100%'
                }),
                new Prop({
                    name: 'columns',
                    type: 'text',
                    label: 'Columns',
                    defaultValue: '33.3% 33.3% 33.3%'
                }),
                new Prop({
                    name: 'gap',
                    type: 'text',
                    label: 'Gutter',
                    defaultValue: '10px'
                })
            ]
        }),
        new ComponentType({
            type: 'Column',
            definition: VpbColumn,
            name: 'Column Renderer',
            icon: 'mdi-table-column-plus-after',
            isRenderer: true,
            description: 'A basic wrapper that renders components in a column',
            props: [
                ...stylingPropDefinitions
            ]
        })
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

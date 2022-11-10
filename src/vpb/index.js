import {useVpbAdminStore} from "@/vpb/stores/vpbAdminStore";
import VpbPost from "@/vpb/views/VpbPost";
import PropEditor from "@/vpb/models/PropEditor";
import VpbPropTextField from "@/vpb/components/propEditors/VpbPropTextField";
import VpbPropColor from "@/vpb/components/propEditors/VpbPropColor";
import VpbCssFourSidesField from "@/vpb/components/propEditors/VpbCssFourSidesField";
import ComponentType from "@/vpb/models/ComponentType";
import VpbRow from "@/vpb/components/pagebuilder/VpbRow";
import Prop from "@/vpb/models/Prop";
import VpbColumn from "@/vpb/components/pagebuilder/VpbColumn";
import {useStylingPropsDefinition} from "@/vpb/composables/StylingProps";
import {usePropTextDefinition} from "@/vpb/composables/TextProps";
import VpbTextEditor from "@/vpb/components/pagebuilder/VpbTextEditor";
import VpbTextareaField from "@/vpb/components/propEditors/VpbTextareaField";
import useVpbFunctions from "@/vpb/composables/useVpbFunctions";
import VpbCheckboxField from "@/vpb/components/propEditors/VpbCheckboxField";


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
        propEditors,
        getPostsRequest,
        updatePostRequest,
        removePostRequest,
        addPostRequest,
        addSourceRequest,
        updateSourceRequest,
        getSourcesRequest,
        removeSourceRequest,
        axiosInstances
    }) {
    const {registerTemplates,registerRoutes,registerPropEditors,registerComponentTypes,registerAxiosInstances} = useVpbFunctions()
    return {
        install: (app, {router}) => {
            let vpbAdminStore = useVpbAdminStore();
            vpbAdminStore.setRequests({
                getPosts: getPostsRequest,
                updatePost: updatePostRequest,
                removePost: removePostRequest,
                addPost: addPostRequest,
                addSource:addSourceRequest,
                removeSource:removeSourceRequest,
                updateSource:updateSourceRequest,
                getSources:getSourcesRequest,
            })
            registerPropEditors([
                new PropEditor({
                    type: 'text',
                    label: 'Text Input',
                    definition: VpbPropTextField
                }),
                new PropEditor({
                    type: 'textarea',
                    label: 'Text Area',
                    definition: VpbTextareaField
                }),
                new PropEditor({
                    type: 'color',
                    label: 'Color Input',
                    definition: VpbPropColor
                }),
                new PropEditor({
                    type: 'checkbox',
                    label: 'Checkbox',
                    definition: VpbCheckboxField
                }),
                new PropEditor({
                    type: 'cssFourSides',
                    label: 'Top Left Bottom Right',
                    definition: VpbCssFourSidesField
                })])
            registerComponentTypes([
                new ComponentType({
                    type: 'Row',
                    definition: VpbRow,
                    icon: 'mdi-table-row',
                    name: 'Row Renderer',
                    isRenderer: true,
                    description: 'A basic wrapper that renders components in a row ',
                    props: [
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
                        }),
                        ...useStylingPropsDefinition(
                            'transparent',
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            'transparent',
                        ),
                        ...usePropTextDefinition('inherit', 'inherit', 'inherit')
                    ]
                }),
                new ComponentType({
                    type: 'Column',
                    definition: VpbColumn,
                    name: 'Column Renderer',
                    icon: 'mdi-table-column',
                    isRenderer: true,
                    description: 'A basic wrapper that renders components in a column',
                    props: [
                        ...useStylingPropsDefinition(
                            'transparent',
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            'transparent',
                        ),
                        ...usePropTextDefinition('inherit', 'inherit', 'inherit')
                    ]
                }),
                new ComponentType({
                    type: 'Text',
                    definition: VpbTextEditor,
                    name: 'Text Renderer',
                    icon: 'mdi-text',
                    isRenderer: false,
                    description: 'A basic wrapper that renders text',
                    props: [
                        new Prop({
                            name: 'content',
                            type: 'textarea',
                            label: 'Text',
                            defaultValue: 'This is a simple dummy text used for typography'
                        }),
                        ...usePropTextDefinition('inherit', 'inherit', 'inherit')
                    ]

                })
            ])
            registerAxiosInstances(axiosInstances);
            registerPropEditors(propEditors);
            registerComponentTypes(componentTypes);
            registerTemplates(templates);
            vpbAdminStore.getSources();
            vpbAdminStore.getPosts().then(() => {
                const pages = vpbAdminStore.pages
                registerRoutes(pages, router);
            })
        }
    }
}


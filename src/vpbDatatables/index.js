import useVpbFunctions from "@/vpb/composables/useVpbFunctions";
import PropEditor from "@/vpb/models/PropEditor";
import DataTableColumnEditor from "@/vpbDatatables/editors/DataTableColumnEditor";
import ComponentType from "@/vpb/models/ComponentType";
import DataTable from "@/vpbDatatables/components/DataTable";
import Prop from "@/vpb/models/Prop";
import dataTableEventEditor from "@/vpbDatatables/editors/DataTableEventEditor";

export function createVpbDataTable() {
    const {registerTemplates, registerRoutes, registerPropEditors, registerComponentTypes} = useVpbFunctions()
    return {
        install: (app) => {
            registerPropEditors([
                new PropEditor({
                    type: 'dataTableColumns',
                    label: 'Data Table Columns',
                    definition: DataTableColumnEditor
                }),
                new PropEditor({
                    type: 'dataTableEvents',
                    label: 'dataTableEvents',
                    definition:dataTableEventEditor
                }),

            ])
            registerComponentTypes([
                new ComponentType({
                    type: 'DataTable',
                    definition: DataTable,
                    name: 'Data Table',
                    isRenderer: false,
                    icon: 'mdi-table',
                    description: 'A basic datatable',
                    props: [
                        new Prop({
                            name: 'name',
                            type: 'text',
                            label:'Name',
                            defaultValue: '',
                        }),
                        new Prop({
                            name: 'columns',
                            type: 'dataTableColumns',
                            label: 'Columns',
                            defaultValue: [{title: 'Column 1', field: 'column1', formatter: 'plaintext'}]
                        }),
                        new Prop({
                            name: 'endpoint',
                            type: 'text',
                            label: 'API Endpoint',
                            defaultValue: 'https://catfact.ninja/breeds',
                            tab: 'Data Load'
                        }),
                        new Prop({
                            name: 'data',
                            type: 'text',
                            label: 'Data',
                            defaultValue: 'data',
                            tab: 'Data Load'
                        }),
                        new Prop({
                            name: 'stackFilters',
                            type: 'checkbox',
                            label: 'Stack field filters',
                            defaultValue: false,
                            tab: 'Events'
                        }),
                        new Prop({
                            name: 'rowClick',
                            tab:'Events',
                            type: 'dataTableEvents',
                            label: 'Row Click',
                            defaultValue: [{ op:'=',  target: '',sourceField:'',targetField:''}]
                        }),
                    ],
                })
            ])
        }
    }
}
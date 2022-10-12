import {defineStore} from "pinia";

export const useVpbDataTableStore = defineStore('vpbDataTable',
    {
        state: () => ({
            datatables: new Map(),
        }),
        actions: {
            setDataTable(id, name) {
                this.datatables.set(id, {
                    id: id,
                    label: name || id,
                    filterBy: [],
                    groupBy: []
                })
            },
            setDataTableName(id, name) {
                const dataTable =  this.datatables.get(id);
                dataTable.label = name;
            },
            addFilterToDataTable(id, {column, value}) {
                this.datatables.get(id).filterBy.push({
                    column: column,
                    value: value,
                })
            },
            addGroupByToDataTable(id, column) {
                this.datatables.get(id).groupBy.push(column)
            }
        },
        getters:{
            getDataTable: (state) => (id) => {
                return state.datatables.get(id)
            },
            dataTablesArray: (state) => {
                return Array.from(state.datatables.values())
            }
        }


    })
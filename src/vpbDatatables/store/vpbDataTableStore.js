import {defineStore} from "pinia";
import TabulatorFIlter from "@/vpbDatatables/models/TabulatorFIlter";
import TabulatorFilter from "@/vpbDatatables/models/TabulatorFIlter";

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
                    filters: [],
                    groupBy: []
                })
            },
            setDataTableName(id, name) {
                const dataTable = this.datatables.get(id);
                dataTable.label = name;
            },
            addFilterToDataTable(id, {field, value, type}) {
                const randomId = Math.random().toString(36).substring(7);
                this.datatables.get(id).filters.push(new TabulatorFilter(
                    {id: randomId, field: field, value: value, type: type}))
            },
            removeFiltersFromDataTable(id) {
                this.datatables.get(id).filters = [];
            },
            removeFiltersFromDataTableByField(id, field) {
                console.log(field)
                this.datatables.get(id).filters = this.datatables.get(id).filters.filter(f => f.field !== field);
            },
            removeFilterFromDataTable(DatableId, filterId) {
                const dataTable = this.datatables.get(DatableId);
                const index = dataTable.filters.findIndex(f => f.id === filterId);
                dataTable.filters = dataTable.filters.splice(index, 1);
            },
            addGroupByToDataTable(id, column) {
                this.datatables.get(id).groupBy.push(column)
            }
        },
        getters: {
            filtersOfDataTable: (state) => (id) => state.datatables.get(id).filters,
            getDataTable: (state) => (id) => {
                return state.datatables.get(id)
            },
            dataTablesArray: (state) => {
                return Array.from(state.datatables.values())
            }
        }


    })
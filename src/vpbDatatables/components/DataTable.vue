<template>
  <div ref="table"></div>
</template>

<script>

import RequiredProps from "@/vpb/models/RequiredProps";
import {computed, onMounted, reactive, ref, toRefs, watch} from "vue";
import {TabulatorFull as Tabulator} from "tabulator-tables";
import {useVpbDataTableStore} from "@/vpbDatatables/store/vpbDataTableStore";
import {cloneDeep,get} from "lodash";

export default {
  props: {
    columns: {type: Array, default: () => [{title: 'Column 1', field: 'column1', formatter: 'plaintext'}]},
    rowClick: {type: Array, default: () => []},
    data: {type: String, default: 'data'},
    endpoint: {type: String, default: ''},
    name: {type: String, default: ''},
    stackFilters: {type: Boolean, default: false},
    ...RequiredProps
  },
  name: "DataTable",
  setup(props) {

    const dataTableStore = useVpbDataTableStore()
    const {id, columns, isEditMode, postName, endpoint, data, name, rowClick, stackFilters} = toRefs(props)
    const table = ref(null); //reference to your table element
    const tabulator = ref(null); //variable to hold your table
    const unique = ref([])
    dataTableStore.setDataTable(id.value, name.value)
    const filters = computed(() => dataTableStore.filtersOfDataTable(id.value))
    onMounted(() => {
      initialiseTabulator()
      addRowClickEvents()
    })
    const initialiseTabulator = () => {
      //instantiate Tabulator when element is mounted
      tabulator.value = new Tabulator(table.value, {
        reactiveData: true, //enable data reactivity
        columns: columns.value,
        layout: "fitColumns", //fit columns to width of table (optional)\
        ajaxURL: endpoint.value, //ajax URL
        maxHeight:"100%",
        ajaxConfig: {
          method: "GET", //set request type to Position
          headers: {
            "X-CSRF-TOKEN": 'lCwOFbpYIRHujBThNfVzpPQLdfQER2eEn2wOzFRK',
            'accept': 'application/json'
          },
        },
        ajaxResponse: function (url, params, response) {
          if(data.value){
            return response[data.value]
          }
          return response; //return the tableData property of a response json object
        },
      });
    }
    const afterTabulatorLoad = () => {
      //trigger download of data.csv file
      tabulator.value.download("csv", "data.csv");
    }
    const addRowClickEvents = () => {
      tabulator.value.on('rowClick', function (e, row) {
        let data = row.getData();
        rowClick.value.forEach((item) => {

          if (item.effect === 'filter') {
            if (!stackFilters.value) {
              dataTableStore.removeFiltersFromDataTableByField(item.target, item.targetField)
            }
            dataTableStore.addFilterToDataTable(item.target,
                {
                  field: item.targetField,
                  value: get(data, item.sourceField),
                  type: item.op
                })
          }
        })
      });
    }
    watch(filters, () => {
      tabulator.value.setFilter(cloneDeep(filters.value))
    }, {deep: true})

    if (isEditMode.value) {
      watch(() => name, (newName) => {
        dataTableStore.setDataTableName(id.value, newName)
      }, {deep: true})
      watch(() => columns, (newColumns) => {
            tabulator.value.setColumns(newColumns.value)
          }, {deep: true}
      )
    }
    return {id, isEditMode, postName, table, tabulator, filters}
  }
}
</script>

<style scoped>
@import "tabulator-tables/dist/css/tabulator.min.css";
</style>
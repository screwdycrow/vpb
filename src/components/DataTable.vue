<template>
  <h1> test </h1>
  <div ref="table"></div>
</template>

<script>

import RequiredProps from "@/vpb/models/RequiredProps";
import {onMounted, reactive, ref, toRefs, watch} from "vue";
import {TabulatorFull as Tabulator} from "tabulator-tables";

export default {
  props: {
    columns: {type: Array, default: () => [{title: 'Column 1', field: 'column1', formatter: 'plainText'}]},
    data: {type: String, default: 'data'},
    endpoint: {type: String, default: ''},
    ...RequiredProps
  },
  name: "DataTable",
  setup(props) {

    const {id, columns, isEditMode, postName, endpoint, data} = toRefs(props)
    const table = ref(null); //reference to your table element
    const tabulator = ref(null); //variable to hold your table
    onMounted(() => {
      //instantiate Tabulator when element is mounted
      tabulator.value = new Tabulator(table.value, {
        reactiveData: true, //enable data reactivity
        columns: columns.value,
        layout: "fitColumns", //fit columns to width of table (optional)\
        ajaxURL: endpoint.value, //ajax URL
        ajaxConfig: {
          method: "GET", //set request type to Position
          headers: {
            "X-CSRF-TOKEN": 'lCwOFbpYIRHujBThNfVzpPQLdfQER2eEn2wOzFRK',
            'accept': 'application/json'
          },
        },
        ajaxResponse: function (url, params, response) {
          return response[data.value]; //return the tableData property of a response json object
        },
      });
    })
    watch(() => columns, (newColumns) => {
          tabulator.value.setColumns(newColumns.value)
        }, {deep: true}
    )
    return {id, isEditMode, postName, table, tabulator}
  }
}
</script>

<style scoped>
@import "tabulator-tables/dist/css/tabulator.min.css";
</style>
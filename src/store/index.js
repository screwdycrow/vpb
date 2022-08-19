import {defineStore} from "pinia";
export const useStore = defineStore('core',{
    state:()=>({
        title:'Pinia'
    })
})
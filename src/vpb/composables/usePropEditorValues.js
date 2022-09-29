import {computed, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default function () {
    const cssFourSidesValue = (value) => computed(() => {
        return value.join(' ')
    })
    const colorValue = (value) => computed(() => {
        return value
    })

    return {
        cssFourSidesValue,
    }
}
import {computed, toRefs} from "vue";
import usePostEditor from "@/vpb/composables/usePostEditor";

export default function () {
    const cssFourSidesValue = (value) => {
        return value.join(' ')
    }
    return {
        cssFourSidesValue,
    }
}
//define pinia store named vpbSourceStore
import {defineStore} from "pinia";
import axios from "axios";

export const useVpbSourceStore = defineStore('vpbSource', {
    state: () => ({
        axiosInstances: new Map(),
        sources: new Map(),
        data: new Map(),
    }),
    actions: {
        addSource(source) {
            this.sources.set(source.name, source)
        },
        removeSource(source) {
            this.sources.delete(source.name)
        },
        setAxiosInstance(name, instance) {
            this.axiosInstances.set(name, instance)
        },
        fillData(name) {
            const source = this.sources.get(id);
            const axiosInstance = this.axiosInstances.get(source.axiosInstance);
            axiosInstance.get(source.url, {
                params: source.params,
            }).then(
                response => {
                    this.data.set(name, response.data)
                }
            )
        },
    },
    getters: {
    }

})

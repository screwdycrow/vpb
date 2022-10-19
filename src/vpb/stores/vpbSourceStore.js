//define pinia store named vpbSourceStore
import {defineStore} from "pinia";
import axios from "axios";

export const useVpbSourceStore = defineStore('vpbSource', {
    state: () => ({
        sources: new Map(),
    }),
    actions: {
        addSource(source) {
            this.sources.set(source.id, source)
        },
        removeSource(id) {
            this.sources.delete(id)
        },
        fillSource(id) {
            const source = this.sources.get(id);
            if (!source) {
                return Promise.resolve();
            } else {
                return axios.get(source.getRequestUrl).then(response => source.data = response.data)
            }
        },
        postSource(id) {
            const source = this.sources.get(id);
            if (!source) {
                return Promise.resolve();
            } else {
                //make an object from sources.postStructure as key  and source.data
                const data = source.postStructure.reduce((acc, cur) => {
                    acc[cur] = source.data[cur];
                    return acc;
                }, {});
                return axios.post(source.postRequestUrl, data).then(response => source.data = response.data)
            }
        }
    },
    getters: {
        getSourceDataKeys: (state) => (id) => {
            const source = state.sources.get(id);
            if (!source) {
                return [];
            } else {
                return Object.keys(source.data);
            }
        }
    }

})

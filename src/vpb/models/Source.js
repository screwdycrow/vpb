export default class Source {
    constructor({id, getRequestUrl, postRequestUrl, data, postStructure}) {
        this.id = id;
        this.getRequestUrl = getRequestUrl;
        this.postRequestUrl = postRequestUrl;
        this.postStructure = this.postStructure || []
        this.data = data || {};
    }
}
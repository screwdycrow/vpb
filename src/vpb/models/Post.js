export default class Post{
    constructor({title, name, path, template,  type, settings,content}) {
        this.name = name;
        this.title = title;
        this.path = path;
        this.type = type;
        this.settings = settings;
        this.content = content;
        this.template= template;
    }
}
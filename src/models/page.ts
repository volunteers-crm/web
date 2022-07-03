import {trans} from "laravel-vue-i18n";

export class Page {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = trans(title)
        this.content = content
    }
}

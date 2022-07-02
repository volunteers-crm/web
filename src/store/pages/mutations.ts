import {Page} from "@/models/page";

export default {
    setPage: (state: any, slug: string, title: string, content: string) => state.items[slug] = new Page(title, content)
}

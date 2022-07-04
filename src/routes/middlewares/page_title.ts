import {APPLICATION_TITLE} from "@/constants/meta";

export default (to: any, from: any, next: any) => {
    document.title = to?.meta?.title || APPLICATION_TITLE

    if (document.title !== APPLICATION_TITLE) {
        document.title += ` - ${APPLICATION_TITLE}`
    }

    next()
}

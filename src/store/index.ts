import {createStore} from "vuex";

import meta from "@/store/meta";
import pages from "@/store/pages";

export default createStore({
    modules: {
        meta,
        pages
    }
})

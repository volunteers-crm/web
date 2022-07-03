import {createStore} from "vuex";

import meta from "@/store/meta";
import pages from "@/store/pages";
import user from "@/store/user";

export default createStore({
    modules: {
        meta,
        pages,
        user,
    }
})

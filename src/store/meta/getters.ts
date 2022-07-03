import {trans} from "laravel-vue-i18n";

export default {
    getPageTitle: (state: any) => trans(state.pageTitle)
}

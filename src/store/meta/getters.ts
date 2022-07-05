import {trans} from "laravel-vue-i18n";

export default {
    getPageTitle: (state: any) => trans(state.pageTitle),

    getMenuRail: (state: any) => state.menu.rail,

    getTimesUpdateEvery: (state: any) => state.times.update.every
}

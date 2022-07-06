import {getLocale} from "@/plugins/locale";

const lang = getLocale()

const resolve = (lang: string) => import(`../lang/${lang}.json`);

export default {lang, resolve}

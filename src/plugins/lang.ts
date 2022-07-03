import Storage from "@/plugins/storage";

const lang = Storage.get('locale')

const resolve = (lang: string) => import(`../lang/${lang}.json`);

export default {lang, resolve}

import Storage from "@/plugins/storage";

const resolve = async (lang: string) => {
    const values = import.meta.glob('@/lang/*.json');

    return await values[`@/lang/${lang}.json`]()
}

const lang = Storage.get('locale')

export default {resolve, lang}

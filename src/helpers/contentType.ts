import { defineAsyncComponent } from "vue";

import _ from 'lodash'

export const fallbackContentType = defineAsyncComponent(() => import('../components/content-types/XText.vue'));

export const contentTypes = {
    animation: () => defineAsyncComponent(() => import('../components/content-types/XAnimation.vue')),
    audio: () => defineAsyncComponent(() => import('../components/content-types/XAudio.vue')),
    contact: () => defineAsyncComponent(() => import('../components/content-types/XContact.vue')),
    document: () => defineAsyncComponent(() => import('../components/content-types/XDocument.vue')),
    location: () => defineAsyncComponent(() => import('../components/content-types/XLocation.vue')),
    sticker: () => defineAsyncComponent(() => import('../components/content-types/XSticker.vue')),
    video: () => defineAsyncComponent(() => import('../components/content-types/XVideo.vue')),
    video_note: () => defineAsyncComponent(() => import('../components/content-types/XVideoNote.vue')),
    voice: () => defineAsyncComponent(() => import('../components/content-types/XVoice.vue')),
}

export const contentType = (type: 'animation' | 'audio' | 'contact' | 'document' | 'location' | 'sticker' | 'video' | 'video_note' | 'voice') => {
    return _.get(contentTypes, type, fallbackContentType)()
}

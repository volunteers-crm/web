import { defineAsyncComponent } from "vue";

import _ from 'lodash'

const fallbackContentType = () => import('../components/content-types/XText.vue');

const contentTypes = {
    animation: () => import('../components/content-types/XAnimation.vue'),
    audio: () => import('../components/content-types/XAudio.vue'),
    contact: () => import('../components/content-types/XContact.vue'),
    document: () => import('../components/content-types/XDocument.vue'),
    location: () => import('../components/content-types/XLocation.vue'),
    sticker: () => import('../components/content-types/XSticker.vue'),
    video: () => import('../components/content-types/XVideo.vue'),
    video_note: () => import('../components/content-types/XVideoNote.vue'),
    voice: () => import('../components/content-types/XVoice.vue'),
}

export const contentType = (type: 'animation' | 'audio' | 'contact' | 'document' | 'location' | 'sticker' | 'video' | 'video_note' | 'voice') => {
    const component = _.get(contentTypes, type, fallbackContentType)

    return defineAsyncComponent(component)
}

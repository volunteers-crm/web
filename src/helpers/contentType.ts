import { defineAsyncComponent } from 'vue'

import _ from 'lodash'

declare type ContentTypeInterface = 'animation' | 'audio' | 'contact' | 'document' | 'location' | 'photo' | 'sticker' | 'text' | 'video' | 'video_note' | 'voice' | 'unsupported';

const fallbackContentType = () => import('../components/content-types/XUnsupported.vue')

const contentTypes = {
    animation: () => import('../components/content-types/XAnimation.vue'),
    audio: () => import('../components/content-types/XAudio.vue'),
    contact: () => import('../components/content-types/XContact.vue'),
    document: () => import('../components/content-types/XDocument.vue'),
    location: () => import('../components/content-types/XLocation.vue'),
    photo: () => import('../components/content-types/XPhoto.vue'),
    sticker: () => import('../components/content-types/XSticker.vue'),
    text: () => import('../components/content-types/XText.vue'),
    video: () => import('../components/content-types/XVideo.vue'),
    video_note: () => import('../components/content-types/XVideoNote.vue'),
    voice: () => import('../components/content-types/XVoice.vue')
}

export const contentType = (type: ContentTypeInterface) => {
    const component = _.get(contentTypes, type, fallbackContentType)

    return defineAsyncComponent(component)
}

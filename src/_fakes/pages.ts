import { MESSAGE_TYPE_DOCUMENT, MESSAGE_TYPE_TEXT } from '@/constants/message_types'

export const about: Page = {
    title: 'About Us Loaded',
    content: [
        {
            type: MESSAGE_TYPE_TEXT,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci earum hic pariatur qui! Accusamus animi consectetur corporis ea enim eum molestias nobis reiciendis sit tenetur. Quo reiciendis sunt tenetur ullam!'
        },
        {
            type: MESSAGE_TYPE_DOCUMENT,
            src: 'https://fakeimg.pl/350x200/?text=World&font=lobster',
            preview: 'https://fakeimg.pl/350x200/?text=World&font=lobster'
        },
        {
            type: MESSAGE_TYPE_TEXT,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci earum hic pariatur qui! Accusamus animi consectetur corporis ea enim eum molestias nobis reiciendis sit tenetur. Quo reiciendis sunt tenetur ullam!'
        },
        {
            type: MESSAGE_TYPE_TEXT,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci earum hic pariatur qui! Accusamus animi consectetur corporis ea enim eum molestias nobis reiciendis sit tenetur. Quo reiciendis sunt tenetur ullam!'
        }
    ]
}

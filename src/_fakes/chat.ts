import _ from 'lodash'

import { MESSAGE_TYPE_DOCUMENT, MESSAGE_TYPE_LOCATION, MESSAGE_TYPE_TEXT } from '@/constants/message_types'

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec mi justo. Ut a diam quis diam efficitur lacinia non.'

const photo = 'https://fakeimg.pl/350x200/?text=World&font=lobster'

export const messages: FakeMessages = {
    1: [
        {
            id: 1,
            sender: {
                id: 123,
                username: 'john',
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/83.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:08',
            updated_at: '2022-07-06 01:59:09'
        },
        {
            id: 2,
            sender: {
                id: 123,
                username: 'john',
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/83.jpg'
            },
            content: {
                src: photo,
                preview: photo
            },
            type: MESSAGE_TYPE_DOCUMENT,
            created_at: '2022-07-05 23:48:27',
            updated_at: '2022-07-05 23:48:27'
        },
        {
            id: 3,
            sender: {
                id: 123,
                username: 'john',
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/83.jpg'
            },
            content: {
                longitude: 59.927857,
                latitude: 30.350500
            },
            type: MESSAGE_TYPE_LOCATION,
            created_at: '2022-07-05 23:48:27',
            updated_at: '2022-07-05 23:48:27'
        }
    ],

    2: [
        {
            id: 3,
            sender: {
                id: 456,
                username: 'dave',
                name: 'Dave Nox',
                avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:08',
            updated_at: '2022-07-05 23:48:08'
        },
        {
            id: 4,
            sender: {
                id: 123,
                username: 'john',
                name: 'Adam Freeman',
                avatar: 'https://randomuser.me/api/portraits/men/53.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:27',
            updated_at: '2022-07-05 23:48:27'
        },
        {
            id: 5,
            sender: {
                id: 123,
                username: 'john',
                name: 'Adam Freeman',
                avatar: 'https://randomuser.me/api/portraits/men/53.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:59',
            updated_at: '2022-07-05 23:48:59'
        }
    ],

    3: [
        {
            id: 6,
            sender: {
                id: 678,
                username: 'olivia',
                name: 'Olivia Milfred',
                avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:08',
            updated_at: '2022-07-05 23:48:08'
        },
        {
            id: 7,
            sender: {
                id: 678,
                username: 'olivia',
                name: 'Olivia Milfred',
                avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:49:08',
            updated_at: '2022-07-05 23:49:08'
        },
        {
            id: 8,
            sender: {
                id: 1,
                name: 'Sandra Adams',
                username: 'sandra_adams',
                avatar: 'https://randomuser.me/api/portraits/women/85.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:27',
            updated_at: '2022-07-05 23:48:27'
        },
        {
            id: 9,
            sender: {
                id: 678,
                username: 'olivia',
                name: 'Olivia Milfred',
                avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
            },
            content: {
                src: photo,
                preview: photo
            },
            type: MESSAGE_TYPE_DOCUMENT,
            created_at: '2022-07-05 23:48:59',
            updated_at: '2022-07-05 23:48:59'
        },
        {
            id: 7,
            sender: {
                id: 678,
                username: 'olivia',
                name: 'Olivia Milfred',
                avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:49:08',
            updated_at: '2022-07-05 23:49:08'
        },
        {
            id: 8,
            sender: {
                id: 1,
                name: 'Sandra Adams',
                username: 'sandra_adams',
                avatar: 'https://randomuser.me/api/portraits/women/85.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:27',
            updated_at: '2022-07-05 23:48:27'
        },
        {
            id: 7,
            sender: {
                id: 678,
                username: 'olivia',
                name: 'Olivia Milfred',
                avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:49:08',
            updated_at: '2022-07-05 23:49:08'
        },
        {
            id: 8,
            sender: {
                id: 1,
                name: 'Sandra Adams',
                username: 'sandra_adams',
                avatar: 'https://randomuser.me/api/portraits/women/85.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:27',
            updated_at: '2022-07-05 23:48:27'
        },
        {
            id: 7,
            sender: {
                id: 678,
                username: 'olivia',
                name: 'Olivia Milfred',
                avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:49:08',
            updated_at: '2022-07-05 23:49:08'
        },
        {
            id: 8,
            sender: {
                id: 1,
                name: 'Sandra Adams',
                username: 'sandra_adams',
                avatar: 'https://randomuser.me/api/portraits/women/85.jpg'
            },
            content: text,
            type: MESSAGE_TYPE_TEXT,
            created_at: '2022-07-05 23:48:27',
            updated_at: '2022-07-05 23:48:27'
        }
    ]
}

export function findMessages(id: number): any
{
    return _.get(messages, id)
}

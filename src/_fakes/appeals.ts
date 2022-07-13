import _ from 'lodash'

export const appeals = [
    {
        id: 1,
        chat: {
            username: 'help_chat',
            name: 'We Can Help',
            timezone: 'UTC'
        },
        client: {
            id: 123,
            username: 'john',
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/83.jpg'
        },
        curator: null,
        source: 'help_bot',
        status: 'new',
        created_at: '2022-07-05 23:48',
        updated_at: '2022-07-06 01:59'
    },
    {
        id: 2,
        chat: {
            username: 'help_chat2',
            name: 'Something',
            timezone: 'Europe/Moscow'
        },
        client: {
            id: 456,
            username: 'dave',
            name: 'Dave Nox',
            avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
        },
        curator: {
            id: 123,
            username: 'john',
            name: 'Adam Freeman',
            avatar: 'https://randomuser.me/api/portraits/men/53.jpg'
        },
        source: 'crm',
        status: 'in_progress',
        created_at: '2022-07-06 20:48',
        updated_at: '2022-07-06 21:59'
    },
    {
        id: 3,
        chat: {
            username: 'help_chat',
            name: 'We Can Help',
            timezone: 'UTC'
        },
        client: {
            id: 678,
            username: 'olivia',
            name: 'Olivia Milfred',
            avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
        },
        curator: {
            id: 1,
            username: 'sandra_adams',
            name: 'Sandra Adams',
            avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
        },
        source: 'crm',
        status: 'done',
        created_at: '2022-07-06 20:48',
        updated_at: '2022-07-06 21:59'
    }
]

export function findAppeal(id: number): any
{
    return _.find(appeals, appeal => appeal.id === id)
}

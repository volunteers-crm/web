import _ from 'lodash'

export const appeals: Appeal[] = [
    {
        id: 1,
        bot: {
            id: 1,
            username: 'Example1Bot',
            name: 'Example 1 Bot',
            timezone: 'UTC',
            locale: 'en'
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
        bot: {
            id: 2,
            username: 'Example2Bot',
            name: 'Example 2 Bot',
            timezone: 'America/Havana',
            locale: 'de'
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
        bot: {
            id: 1,
            username: 'Example1Bot',
            name: 'Example 1 Bot',
            timezone: 'UTC',
            locale: 'en'
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

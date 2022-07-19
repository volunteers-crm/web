import { rolesGroupByCategory } from '@/_fakes/roles'

export const bots: Bot[] = [
    {
        id: 1,
        username: 'Example1Bot',
        name: 'Example 1 Bot',
        timezone: 'UTC',
        locale: 'en',
        channels: [
            {
                id: 1,
                username: 'help_chat',
                name: 'We Can Help'
            }
        ]
    },
    {
        id: 2,
        username: 'Example2Bot',
        name: 'Example 2 Bot',
        timezone: 'America/Havana',
        locale: 'de'
    }
]

export const botSearch: Bot = {
    id: 1,
    username: 'Example1Bot',
    name: 'Example 1 Bot',
    timezone: 'UTC',
    locale: 'en',
    roles: rolesGroupByCategory
}

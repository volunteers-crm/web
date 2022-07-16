export const channels: Channel[] = [
    {
        id: 1,
        username: 'help_chat',
        name: 'We Can Help',
        appeals: {
            open: 14,
            closed: 36
        },
        bot: {
            id: 1,
            username: 'Example1Bot',
            name: 'Example 1 Bot',
            timezone: 'UTC',
            locale: 'en'
        }
    },
    {
        id: 2,
        username: 'help_chat2',
        name: 'Something',
        appeals: {
            open: 0,
            closed: 19
        },
        bot: {
            id: 2,
            username: 'Example2Bot',
            name: 'Example 2 Bot',
            timezone: 'America/Havana',
            locale: 'de'
        }
    }
]

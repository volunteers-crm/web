import _ from "lodash";

export const issues = [
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
            name: 'John Doe'
        },
        curator: null,
        source: "help_bot",
        status: "in_progress",
        created_at: "2022-07-05 23:48",
        updated_at: "2022-07-06 01:59"
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
            name: 'Dave Helper'
        },
        curator: {
            id: 123,
            username: 'john',
            name: 'John Doe'
        },
        source: "crm",
        status: "new",
        created_at: "2022-07-06 20:48",
        updated_at: "2022-07-06 21:59"
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
            name: 'Olivia'
        },
        curator: {
            id: 1,
            username: 'sandra_adams',
            name: 'Sandra Adams'
        },
        source: "crm",
        status: "new",
        created_at: "2022-07-06 20:48",
        updated_at: "2022-07-06 21:59"
    }
]

export function findIssue(id: number): any {
    return _.find(issues, issue => issue.id === id)
}

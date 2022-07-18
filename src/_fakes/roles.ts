import _ from 'lodash'

export const roleCategories: RoleCategory[] = [
    {
        id: 1,
        title: 'IT',
        can_storage: true
    },
    {
        id: 2,
        title: 'Veterinary',
        can_storage: false
    }
]

export const roles: Role[] = [
    {
        id: 1,
        title: 'Computer help',
        is_storage: false,
        category: {
            id: 1,
            title: 'IT',
            can_storage: true
        }
    },
    {
        id: 2,
        title: 'Computer warehouse',
        is_storage: true,
        category: {
            id: 1,
            title: 'IT',
            can_storage: true
        }
    },
    {
        id: 3,
        title: 'Veterinary help',
        is_storage: false,
        category: {
            id: 2,
            title: 'Veterinary',
            can_storage: false
        }
    }
]

export const rolesGroupByCategory: RoleGroupByCategory = _.groupBy(roles, (role: Role) => role.category.title)

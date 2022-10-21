import { ROUTE_MAIN } from '@/routes/names'

import router from '@/routes'

import { useUserStore } from '@/stores/user'

export function logout()
{
    useUserStore().logout()

    router.push({ name: ROUTE_MAIN })
}

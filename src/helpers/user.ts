import { ROUTE_MAIN } from '@/routes/names'

import router from '@/routes'

import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

export function logout()
{
    useAuthStore().logout()
    useUserStore().logout()

    router.push({ name: ROUTE_MAIN })
}

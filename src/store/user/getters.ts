import { User, UserStore } from '@/contracts/store/User'

export default {
    isLogged: (state: UserStore): boolean => state.isLogged,
    get: (state: UserStore): User => state.user
}

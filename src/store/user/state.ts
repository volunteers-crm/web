import { UserStore } from '@/contracts/store/User'

export default (): UserStore => ({
    isLogged: false,

    user: {
        id: null,
        username: null,
        name: null,
        avatar: null
    }
})

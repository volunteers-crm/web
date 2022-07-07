import { Auth } from '@/contracts/store/Auth'

export default {
    token: (state: Auth): string | null => state.token || null
}

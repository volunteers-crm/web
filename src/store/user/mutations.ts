export default {
    setUser: (state: any, user: any) => {
        state.user = user
        state.isLogged = true
    },
    logout: (state: any) => {
        state.user = {}
        state.isLogged = false
    }
}

export default {
    setUser: (state: any, user: any) => {
        state.user = user
        state.isLogged = true
    }
}

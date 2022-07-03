export default {
    hasUser: (state: any) => !!state?.user?.id,
    getUser: (state: any) => state.user
}

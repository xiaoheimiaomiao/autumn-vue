const getters = {
    userInfo: state => state.user.userInfo,
    roleList: state => state.user.roleList,
    token: state => state.user.token,
    dynamicRoutes: state => state.menu.dynamicRoutes
}

export default getters

const menu = {
    //状态值
    state: {
        dynamicRoutes : [],
    },
    //同步修改
    mutations: {
        ADD_DYNAMIC_ROUTE: (state, dynamicRoutes) => {
            state.dynamicRoutes = dynamicRoutes;
        }
    }
}

export default menu;

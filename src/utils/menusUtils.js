import router, {constantRouterMap} from "@/router/routers";
import {getMenusInfo} from "@/api/system/menuApi";
import store from "@/store";
import _ from "lodash"
import {Message} from "view-design";
import Router from "vue-router";

export const getMenus = () => {
    return new Promise(resolve => {
        getMenusInfo(store.getters.userInfo.id).then(result => {
            if (result['code'] !== '000000') {
                Message.error("请重新登录");
                router.push("/")
            }
            addRouters(result.data.children)
            resolve(result.data.children);
        })
    })

}

const addRouters = (menuChildrenList) => {

    const routers = _.cloneDeep(constantRouterMap);
    const navigation = {
        path: "/navigation",
        name: "navigation",
        meta: {title: '导航栏', noCache: true, auth: true},
        component: () => import("@/views/Navigation"),
        children: []
    };
    let allMenuItems = getAllMenuItems(menuChildrenList);
    allMenuItems.forEach(menu => {
        if (menu.visible === 0 || menu.visible === "0") {
            const route = {
                path: menu.path,
                name: menu["menuName"],
                meta: {title: menu["menuName"], noCache: true, auth: menu["authLogin"] === "0"},
            }
            route.component = loadView(menu["component"])
            navigation.children.push(route)
        }
    })
    const routes = routers.concat([navigation]);
    router.addRoutes(routes)
}

function getAllMenuItems(menuChildrenList) {
    menuChildrenList = menuChildrenList.filter(menu => menu.visible === 0 || menu.visible === "0")
    let menus = []
    menuChildrenList.map(menu => {
        if (menu.children !== null) {
            menus = menus.concat(menu.children);
        }
    })
    return menus;
}

function loadView(view) {
    return () => import(`@/views${view}`);
}


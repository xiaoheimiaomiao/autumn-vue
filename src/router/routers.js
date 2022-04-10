import Vue from "vue";
import Router from "vue-router";
import Config from "@/settings";
import store from "@/store";
import _ from "lodash"
import ro from "element-ui/src/locale/lang/ro";
import fr from "element-ui/src/locale/lang/fr";
import Login from "@/views/Login";
import {getMenus} from "@/utils/menusUtils";

Vue.use(Router)

export const constantRouterMap = [
    {
        path: "*",
        name: '404',
        component: () => import("@/views/404")
    },
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        meta: {title: '登录', noCache: true, auth: false},
        component: () => import("@/views/Login"),
    },
    {
        path: "/register",
        meta: {title: '注册', noCache: true, auth: false},
        component: () => import("@/views/Register"),
    }
]

const router = new Router({
    // mode: 'hash',
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

/**
 * 路由跳转
 */
router.beforeEach((to, from, next) => {
    if (to.meta['title']) {
        document.title = to.meta['title'] + ' - ' + Config.title
    }
    if (to.path === "/navigation" || from.name === null) {
        getMenus().then();
    }
    if (to.meta['auth']) {
        //todo 验证登录
        next()
    }
    next()
})

export default router;

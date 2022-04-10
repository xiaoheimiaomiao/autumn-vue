import {login} from "@/api/login/loginApi";
import _ from "lodash"

const user = {
    //状态值
    state: {
        userInfo: {},
        token: "",
        roleList: []
    },
    //同步修改
    mutations: {
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        CLEAR_USER_INFO: (state) => {
            state.userInfo = {}
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        CLEAR_TOKEN: (state, token) => {
            state.token = ""
        },
        SET_ROLE_LIST: (state, roleList) => {
            state.roleList = roleList
        },
        SET_ROLE: (state, role) => {
            state.roleList.push(role)
        },
        CLEAR_ROLE_LIST: (state, roleList) => {
            state.roleList = ""
        }
    },
    //异步修改
    actions: {
        Login({commit}, loginModel) {
            loginModel.loginName = loginModel.loginName.trim()
            return new Promise((resolve, reject) => {
                login(loginModel).then(response => {
                    const userInfo = _.cloneDeep(response.data);
                    commit('SET_TOKEN', userInfo.token)
                    commit('SET_ROLE_LIST', userInfo.roleList)
                    delete userInfo.token;
                    delete userInfo.roleList
                    commit('SET_USER_INFO', userInfo)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user;

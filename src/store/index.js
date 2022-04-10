import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import user from "./modules/user";
import menu from "./modules/menu"
import getters from "./getters";

Vue.use(Vuex)

let createPersistedState = persistedState({
    key: 'store',
    storage: localStorage
})

const store = new Vuex.Store({
    plugins: [createPersistedState],
    modules: {
        user,
        menu
    },
    getters
})

export default store;

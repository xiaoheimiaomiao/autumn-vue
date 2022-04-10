import store from '@/store/index'

const tokenPrefix = "Bearer ";

export class Token {
    constructor(token) {
        this.token = tokenPrefix + (this.hasToken() ? store.getters.token : token)
    }

    hasToken() {
        const token = store.getters.token;
        return !!token
    }


}

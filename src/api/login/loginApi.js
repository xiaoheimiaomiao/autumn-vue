import http from "@/utils/http";

const URL_PREFIX = "/Autumn/v1/public/system/core"

const url = {
    login: URL_PREFIX + "/login",
    register: URL_PREFIX + "/register"
}

export const login = loginData => http.post(url.login, loginData)

export const register = registerData => http.post(url.register, registerData)

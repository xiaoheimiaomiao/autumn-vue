import axios from "axios";
import router from "@/router/routers"
import store from "@/store"
import Config from "@/settings"
import {Message} from "view-design";
import {Token} from "@/utils/token";

// 创建axios实例
const service = axios.create({
    baseURL: '/api', // api 的 base_url
    timeout: Config.timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        //todo token验证
        if (new Token().hasToken()) {
            config.headers["Authorization"] = new Token().token
        }
        config.headers['Content-Type'] = 'application/json'
        return config
    },
    error => {
        let promise = Promise.reject(error);
    }
)

// response 拦截器
service.interceptors.response.use(response => {
    const result = response.data;
    if (result.code === "100004") {
        Message.error({
            content: "认证失败，请重新登录！",
            duration: 3
        })

        return Promise.reject('error')
    }
    return response.data
}, error => {
    console.log('err', error.response)// for debug
    const result = error.response.data
    Message.error({
        content: typeof result["message"] === "object" ? JSON.stringify(result["message"]) : result["message"],
        duration: 3
    })
    return Promise.reject(error)
})

export default service

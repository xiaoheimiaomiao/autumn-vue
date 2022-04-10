import request from "./request";
import contentType from "./requestContentTypes";
import  axios from "axios";
import qs from "qs"

const http = {
    /**
     * 默认Content-type为"application/json;charset=UTF-8
     */
    contentType: contentType.APPLICATION_JSON,
    /**
     * get请求参数封装
     * @param url
     * @param params
     * @returns {AxiosPromise}
     */
    get: (url, params) => {
        return request({
            url: url,
            method: 'get',
            params: params
        })
    },
    /**
     * get请求参数封装
     * @param url
     * @param params
     * @returns {AxiosPromise}
     */
    delete: (url, params) => {
        return request({
            url: url,
            method: 'delete',
            params: params,
            // 重点在这里
            paramsSerializer: params => {
                return qs.stringify(params, {indices: false})
            }
        })
    },
    /**
     * post请求参数封装
     * @param url
     * @param data
     * @returns {AxiosPromise}
     */
    post: (url, data) => {
        return request({
            url: url,
            method: 'post',
            data: data,
            headers: {
                'Content-Type': http.contentType
            }
        })
    },
    upload: (url, data) => {
        return request({
            url: url,
            method: 'post',
            data: data,
            headers: {
                'Content-Type': contentType.MULTIPART_FORM_DATA
            }
        })
    },
    /**
     * 读取本地JSON文件
     * @param jsonUrl
     * @returns {Promise<AxiosResponse<any>>}
     */
    readJson: (jsonUrl) => {
        return new Promise((resolve, reject) => {
            axios.get(jsonUrl).then(response => {
                const data = response.data;
                if (response.status !== 200) {
                    reject(response)
                } else {
                    resolve(data)
                }
            }).catch(error => {
                reject(error);
            })
        });
    },
    download: (url, data) => {
        return request({
            url: url,
            method: 'post',
            data: data,
            responseType: 'blob'
        })
    }
}

export default http;

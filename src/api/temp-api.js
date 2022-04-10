import request from "@/utils/request";

export const getList = (data) => {
    return request({
        url:'/xxxx',
        method: 'post',
        data: data
    })
}
export const del = (id) => request.delete('/xxxx', {
    params: {
        id
    }
})
export const add = (data) => request({
    url: '/xxxx',
    method: 'post',
    data: data
})
export const update = (data) => request({
    url: '/xxxx',
    method: 'put',
    data: data
})

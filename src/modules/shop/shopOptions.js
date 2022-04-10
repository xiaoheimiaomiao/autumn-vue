import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'shop',
columns: [
    {
    title: " ID",
    key:"id",
        hidden: false,
        type: "input"
    },
    {
    title: " 商店名称",
    key:"shopName",
        hidden: false,
        type: "input"
    },
    {
    title: " 所属用户",
    key:"userName",
        hidden: false,
        type: "selection",
        options: [{dicText: ""}],
        getOptions: function () {
            return new Promise(resolve => {
                http.get('/Autumn/v1/private/user/query').then(result => {
                    const {data} = result;
                    queryByData(data,'loginName').then(res => {
                        resolve(res.data)
                    })
                })
            })
        }
    },
    {
    title: " 商店照片",
    key:"shopLogo",
        hidden: false,
        type: "avatar"
    },
    {
    title: " 商店类型",
    key:"shopType",
        hidden: false,
        type: "selection",
        options: [{dicText: ""}],
            getOptions: function () {
                return new Promise(resolve => {
                    queryByType("shopType").then(response => {
                       resolve(response.data)
                })
            })
        }
    },
    {
    title: " 备注",
    key:"remark",
        hidden: false,
        type: "input"
    },
],
foreignKey: 'shopName',
referencesKey: 'shopName'
}
}

import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'information',
columns: [
    {
    title: " ID",
    key:"id",
        hidden: true,
        type: "input"
    },
    {
    title: " 咨询名称",
    key:"informationName",
        hidden: false,
        type: "input"
    },
    {
    title: " 用户名称",
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
    title: " 咨询日期",
    key:"informationDate",
        hidden: false,
        type: "datetime",
    },
    {
    title: " 商店名称",
    key:"shopName",
        hidden: false,
        type: "selection",
        options: [{dicText: ""}],
        getOptions: function () {
            return new Promise(resolve => {
                http.get('/Autumn/v1/private/shop/query').then(result => {
                    const {data} = result;
                    queryByData(data,'shopName').then(res => {
                        resolve(res.data)
                    })
                })
            })
        }
    },
    {
    title: " 咨询内容",
    key:"informationInfo",
        hidden: false,
        type: "input"
    },
    {
    title: " 咨询状况",
    key:"informationStatus",
        hidden: false,
        type: "selection",
        options: [{dicText: ""}],
        getOptions: function () {
            return new Promise(resolve => {
                queryByType("informationStatus").then(response => {
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

import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'good',
columns: [
    {
    title: " ID",
    key:"id",
        hidden: true,
        type: "input"
    },
    {
    title: " 商品名称",
    key:"goodName",
        hidden: false,
        type: "input"
    },
    {
    title: " 商品照片",
    key:"goodLogo",
        hidden: false,
        type: "avatar"
    },
    {
    title: " 商品类型",
    key:"goodType",
        hidden: false,
        type: "selection",
        options: [{dicText: ""}],
        getOptions: function () {
            return new Promise(resolve => {
                http.get('/Autumn/v1/private/goodType/query').then(result => {
                    const {data} = result;
                    queryByData(data,'typeName').then(res => {
                        resolve(res.data)
                    })
                })
            })
        }
    },
    {
    title: " 商品金额",
    key:"goodMoney",
        hidden: false,
        type: "input"
    },
    {
    title: " 备注",
    key:"remark",
        hidden: false,
        type: "input"
    },
],
foreignKey: 'id',
referencesKey: 'id'
}
}

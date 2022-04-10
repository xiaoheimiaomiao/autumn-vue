import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'history',
columns: [
    {
    title: " ID",
    key:"id",
        hidden: true,
        type: "input"
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
    title: " 记录日期",
    key:"historyDate",
        hidden: false,
        type: "datetime",
    },
    {
    title: " 商品名称",
    key:"goodName",
        hidden: false,
        type: "selection",
        options: [{dicText: ""}],
        getOptions: function () {
            return new Promise(resolve => {
                http.get('/Autumn/v1/private/good/query').then(result => {
                    const {data} = result;
                    queryByData(data,'goodName').then(res => {
                        resolve(res.data)
                    })
                })
            })
        }
    },
    {
    title: " 数量",
    key:"number",
        hidden: false,
        type: "input"
    },
    {
    title: " 金额",
    key:"money",
        hidden: false,
        type: "input"
    },
    {
    title: " 操作类型",
    key:"historyType",
        hidden: false,
        type: "selection",
        options: [{dicText: ""}],
            getOptions: function () {
                return new Promise(resolve => {
                    queryByType("historyType").then(response => {
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
foreignKey: 'id',
referencesKey: 'id'
}
}

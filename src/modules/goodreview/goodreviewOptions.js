import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'goodReview',
columns: [
    {
    title: " ID",
    key:"id",
        hidden: true,
        type: "input"
    },
    {
    title: " 用户名称",
    key:"userName",
        hidden: false,
        type: "input"
    },
    {
    title: " 评论日期",
    key:"reviewDate",
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
    title: " 评论内容",
    key:"reviewInfo",
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
foreignKey: 'goodName',
referencesKey: 'goodName'
}
}

import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'car',
columns: [
    {
    title: " ID",
    key:"id",
        hidden: true,
        type: "input"
    },
    {
    title: " 车辆名称",
    key:"carName",
        hidden: false,
        type: "input"
    },
    {
    title: " 车牌号",
    key:"carNumber",
        hidden: false,
        type: "input"
    },
    {
    title: " 车辆照片",
    key:"carLogo",
        hidden: false,
        type: "avatar"
    },
    {
    title: " 车辆状况",
    key:"carStatus",
        hidden: false,
        type: "selection",
        options: [{dicText: ""}],
        getOptions: function () {
            return new Promise(resolve => {
                queryByType("carStatus").then(response => {
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

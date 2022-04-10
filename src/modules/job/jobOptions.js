import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'job',
    columns: [
    {
    title: " 商店名称",
    key:"shopName",
        hidden: false,
        type: "input"
    },
    {
    title: " 商品名称",
    key:"goodName",
        hidden: false,
        type: "input"
    },
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
    title: " 购买日期",
    key:"jobDate",
        hidden: false,
        type: "datetime",
    },
    {
    title: " 数量",
    key:"number",
        hidden: false,
        type: "input"
    },
    {
    title: " 工单金额",
    key:"jobMoney",
        hidden: false,
        type: "input"
    },
    {
    title: " 工单状况",
    key:"jobStatus",
        hidden: false,
        type: "input"
    },
    {
    title: " 车辆名称",
    key:"carName",
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

import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'shopGood',
columns: [
    {
    title: " ID",
    key:"id",
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
    title: " 商店名称",
    key:"shopName",
        hidden: false,
        type: "input"
    },
    {
    title: " 数量",
    key:"number",
        hidden: false,
        type: "input"
    },
],
foreignKey: 'shopName',
referencesKey: 'shopName'
}
}

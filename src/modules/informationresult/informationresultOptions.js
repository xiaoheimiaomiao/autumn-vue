import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'informationResult',
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
    title: " 回复日期",
    key:"resultDate",
        hidden: false,
        type: "datetime",
    },
    {
    title: " 用户名称",
    key:"userName",
        hidden: false,
        type: "input"
    },
    {
    title: " 回复内容",
    key:"resultInfo",
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

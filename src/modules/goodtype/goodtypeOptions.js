import {queryByType, queryByData} from "@/api/system/dicApi";
import http from "@/utils/http";

export default (self) => {
return {
self: self,
index: true,
align: 'center',
border: true,
stripe: true,
module: 'goodType',
columns: [
    {
    title: " ID",
    key:"id",
        hidden: true,
        type: "input"
    },
    {
    title: " 类型名称",
    key:"typeName",
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

import {queryByType} from "@/api/system/dicApi";

export default (self) => {
    return {
        self: self,
        index: true,
        align: 'center',
        border: true,
        stripe: true,
        module: 'user',
        columns: [
            {
                title: " ID",
                key:"id",
                hidden: true,
                type: "input"
            },
            {
                title: " 用户名",
                key:"loginName",
                hidden: false,
                type: "input"
            },
            {
                title: " 真实名称",
                key:"realName",
                hidden: false,
                type: "input",
            },
            {
                title: " 性别",
                key:"sex",
                hidden: false,
                type: "selection",
                options: [{dicText: ""}],
                getOptions: function () {
                    return new Promise(resolve => {
                        queryByType("sexType").then(response => {
                            resolve(response.data)
                        })
                    })
                }
            },
            {
                title: " 联系方式",
                key:"phoneNumber",
                hidden: false,
                type: "input"
            },
            {
                title: " 年龄",
                key:"age",
                hidden: false,
                type: "input"
            },
            {
                title: " 头像",
                key:"avatarUrl",
                hidden: false,
                type: "avatar"
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

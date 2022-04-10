import _ from 'lodash'

const indexColumn = {
    type: 'index',
    title: '序号',
    width: 80,
    align: 'center'
}


const action = {
    title: '操作',
    slot: 'action',
    width: 220,
    align: 'center',
    fixed: 'right'
}

String.prototype.format = function () {
    if (arguments.length === 0) return this;
    let str = this
    for (let i = 0; i < arguments.length; i++) {
        str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
    return str;
}

Array.prototype.top = function (number) {
    let array = []
    for (let i = 0; i < number; i++) {
        array.push(this[i])
    }
    return array;
}

/**
 * 生成新的columns
 * @param options
 * @returns {*}
 */
export function generateColumns(options, extraOp) {
    let tableColumns = _.cloneDeep(options.columns)
    if (options.index) {
        tableColumns.unshift(indexColumn)
    }
    if (options.align) {
        tableColumns.map(item => item["align"] = options.align)
    }
    tableColumns.map(item => {
        if (item.type === "avatar") {
            item.slot = "image";
        }
        if (item.type === "datetime") {
            item.slot = "datetime";
        }
        delete item["hidden"];
        if (item["type"] !== "index") {
            delete item["type"];
        }
        if (item.type === "selection") {
            delete item["options"]
        }
    })
    if (extraOp) {
        tableColumns.push(action);
    }

    return tableColumns
}

export function generateModalFormItems(options) {
    let columns = _.cloneDeep(options.columns);
    columns.map(column => {
        if (column.type === 'selection') {
            column.getOptions().then(data => {
                column.options = data;
            })
        }
    })
    return columns;
}

/**
 * 获取ApiUrl
 * @param options
 * @returns {{edit: string, query: string, save: string, list: string, remove: string}}
 */
export function generateApiUrlModel(options) {
    const module = options.module;
    const urlPrefix = `/Autumn/v1/private/${module}`
    return {
        query: urlPrefix + "/query",
        list: urlPrefix + "/list",
        save: urlPrefix + "/save",
        edit: urlPrefix + "/edit",
        remove: urlPrefix + "/remove"
    }
}

export function generateQueryModel(options, pageModel) {
    let queryModel = {
        page: pageModel.page,
        size: pageModel.size
    }
    let queryFields = _.cloneDeep(options["queryFields"] ? options["queryFields"] : options.columns.top(2))
    queryFields.forEach(field => {
        queryModel[field.key] = ""
    })
    return queryModel;
}

export function generateQueryModelList(options) {
    return  _.cloneDeep(options["queryFields"] ? options["queryFields"] : options.columns.top(2))
}

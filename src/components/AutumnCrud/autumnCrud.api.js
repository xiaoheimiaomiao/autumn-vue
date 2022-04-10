import {generateApiUrlModel} from "@components/AutumnCrud/autumnCrud.parse";
import _ from "lodash"
import http from "@/utils/http";


let apiUrlModel = {
    query: "",
    list: "",
    save: "",
    edit: "",
    remove: ""
};

export function initApi(options) {
    apiUrlModel = _.cloneDeep(generateApiUrlModel(options))
}

export const query = params => http.get(apiUrlModel.query, params)

export const list = params => http.get(apiUrlModel.list, params)

export const save = data => http.post(apiUrlModel.save, data)

export const edit = data => http.post(apiUrlModel.edit, data)

export const remove = idList => http.delete(apiUrlModel.remove, {idList})



import http from "@/utils/http";

const URL_PREFIX = "/Autumn/v1/private/database"

const url = {
    putTxt: URL_PREFIX + '/txt/put',
}

export const parseTxt = model => http.upload(url.putTxt, model)

import http from "@/utils/http";

const URL_PREFIX = "/Autumn/v1/public/system/dic"

const url = {
    queryByType: URL_PREFIX + "/query/by-type",
    queryByData: URL_PREFIX + "/query/by-data"
}

export const queryByType = dicType => http.get(url.queryByType, {dicType});
export const queryByData = (data, name) => http.post(url.queryByData, {data, name});



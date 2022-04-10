import http from "@/utils/http";

const URL_PREFIX = "/Autumn/v1/public/system"

const url = {
    menu: URL_PREFIX + "/menu"
}

export const getMenusInfo = userId => http.get(url.menu, {userId})

import http from "@/utils/http";

const URL_PREFIX = "/Autumn/v1/public/personal/user/"

const url = {
    editUserUrl: URL_PREFIX + '/edit'
}

export const editUser = (model, avatar) => {
    let formData = new FormData();
    if (avatar) {
        formData.append("avatar", avatar);
    }
    for (let key in model) {
        formData.append(key, model[key]);
    }
    return http.upload(url.editUserUrl, formData);
}



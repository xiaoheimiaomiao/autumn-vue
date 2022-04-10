import http from "@/utils/http";

const URL_PREFIX = "/Autumn/v1/public/upload/core"

const url = {
    uploadFileUrl: URL_PREFIX + '/file',
    showImagesUrl: URL_PREFIX + '/show/image'
}

export const uploadFile = (file, type) => {
    let formData = new FormData();
    if (type === undefined || type === 'file') {
        formData.append("file", file);
    }
    if (type === 'formData') {
        formData = file;
    }
    return http.upload(url.uploadFileUrl, formData);
}

export const showImages = path => http.get(url.showImagesUrl, {imagePath: path})


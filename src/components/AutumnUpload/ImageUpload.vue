<template>
    <Row :gutter="10">
        <Col :span="imageSpan">
            <div v-if="showSelectedImg">
                <img alt="image" style="width: 68px;height:68px;line-height: 68px;margin: 0 auto;text-align: center"
                     :src="selectedImg">
            </div>
        </Col>
        <Col :span="uploadSpan">
            <Upload ref="upload"
                    action="#"
                    :multiple="multiple"
                    :disabled="disabled"
                    :show-upload-list="showUploadList"
                    :max-size="maxSize"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="formatterError"
                    :before-upload="beforeUpload"
                    style="display: inline-block;width:68px;height: 68px; border: dashed 1px;border-radius: 2px">

                <div style="width: 68px;height:68px;line-height: 68px;margin: 0 auto;text-align: center">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
        </Col>
    </Row>
</template>

<script>
    import {uploadFile} from "@/api/system/uploadApi";

    export default {
        name: "ImageUpload",

        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            showUploadList: {
                type: Boolean,
                default: true
            },
            maxSize: {
                type: Number
            },
            data: {
                required: true,
                default: ''
            },
            item: {
                required: true,
                default: Object
            },
        },
        data() {
            return {
                uploadList: [],
                selectedImg: this.data,
                showSelectedImg: false,
                imageSpan: 0,
            }
        },
        watch: {
            showSelectedImg: function (value) {
                this.imageSpan = value ? 12 : 0;
            },
            selectedImg: function (value) {
                this.showSelectedImg = !!value;
            }
        },
        computed: {
            uploadSpan: function () {
                return 24 - this.imageSpan;
            }
        },
        methods: {
            resetUpload() {
                this.uploadList = [];
                this.selectedImg = this.data
                this.showSelectedImg = false;
                this.imageSpan = 0;
            },
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            formatterError() {
                this.$Message.error({content: "仅支持 jpg, jpeg, png 格式文件", duration: 2})
            },
            beforeUpload(file) {
                this.showSelectedImg = true
                this.selectedImg = window.URL.createObjectURL(file);
                uploadFile(file).then(result => {
                    if (result.code === '000000') {
                        this.$emit('getUploadUrl', {url: result.data, item: this.item})
                    }
                });
                return false;
            }
        }
    }
</script>

<style scoped>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
    <Layout style="height: 100%">
        <Content style="height: 100%;width: 100%">
            <Card class="card">
                <p slot="title">{{ userInfo.loginName }} 的个人资料</p>
                <div class="center-style">
                    <Row :gutter="10">
                        <Col>
                            <img :src="userInfo.showImagesUrl" style="height: 90px;width: 90px;border-radius: 5px"
                                 alt="">
                        </Col>
                        <Col>
                            <Upload ref="upload"
                                    action="#"
                                    :multiple="false"
                                    :format="['jpg','jpeg','png']"
                                    :on-format-error="formatterError"
                                    :before-upload="beforeUpload"
                                    style="display: inline-block;width:90px;height: 90px; border: dashed 1px;border-radius: 2px">
                                <div
                                        style="width: 90px;height:90px;line-height: 90px;margin: 0 auto;text-align: center">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                        </Col>
                    </Row>
                </div>
                <Form v-model="userInfo">
                    <FormItem label="用户名" :label-width="80" label-position="left">
                        <Input v-model="userInfo.loginName"></Input>
                    </FormItem>
                    <FormItem label="年龄" :label-width="80" label-position="left">
                        <Input v-model="userInfo.age"></Input>
                    </FormItem>
                    <FormItem label="真实姓名" :label-width="80" label-position="left">
                        <Input v-model="userInfo.realName"></Input>
                    </FormItem>
                    <FormItem label="手机号" :label-width="80" label-position="left">
                        <Input v-model="userInfo.phoneNumber"></Input>
                    </FormItem>
                </Form>
                <div class="center-style">
                    <AutumnButton type="info" @click="modifyUser">保存信息</AutumnButton>
                    <AutumnButton style="margin-left: 20px" @click="isShow.changePassword = true">修改密码</AutumnButton>
                </div>
            </Card>
            <Modal v-model="isShow.changePassword" title="修改密码"
                   @on-ok="modifyPassword"
                   @on-cancel="isShow.changePassword = false">
                <Form v-model="changePassword">
                    <FormItem>
                        <Input type="password" v-model="changePassword.oldPassword" placeholder="请输入原始密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Input type="password" v-model="changePassword.newPassword" placeholder="请输入新密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Input type="password" v-model="changePassword.passwordAgain" placeholder="请再次输入新密码"></Input>
                    </FormItem>
                </Form>
            </Modal>
        </Content>
    </Layout>
</template>

<script>
    import {uploadFile, showImages} from "@/api/system/uploadApi";
    import {editUser} from "@/api/system/personalUserApi"

    export default {
        name: "PersonalCenter",
        data() {
            return {
                userInfo: {
                    showImagesUrl: "",
                    avatarUrl: "",
                    loginName: "",
                    phoneNumber: "",
                    realName: "",
                    id: "",
                    age: ""
                },
                isShow: {
                    changePassword: false
                },
                changePassword: {
                    oldPassword: "",
                    newPassword: "",
                    passwordAgain: ""
                }

            }
        },
        created() {
            this.getCurrentUser();
        },
        watch: {
            changePasswordShow: function (value) {
                if (value) {
                    this.changePassword = {
                        oldPassword: "",
                        newPassword: "",
                        passwordAgain: ""
                    }
                }
            }
        },
        computed: {
            changePasswordShow: function () {
                return this.isShow.changePassword
            }
        },
        methods: {
            getCurrentUser: function () {
                const userInfo = this.$store.getters.userInfo;
                this.userInfo.loginName = userInfo.loginName === null ? "admin" : userInfo.loginName;
                this.userInfo.avatarUrl = userInfo.avatarUrl === '' ? 'https://i.loli.net/2017/08/21/599a521472424.jpg' :
                    userInfo.avatarUrl
                this.showImage()
                this.userInfo.realName = userInfo.realName;
                this.userInfo.phoneNumber = userInfo.phoneNumber;
                this.userInfo.age = userInfo.age;
                this.userInfo.id = userInfo.id;
            },
            formatterError: function () {
                this.$Message.error({content: "仅支持 jpg, jpeg, png 格式文件", duration: 2})
            },
            beforeUpload: function (file) {
                editUser(this.userInfo, file).then(result => {
                    if (result.code === '000000') {
                        this.$store.commit('SET_TOKEN', result.data.token)
                        this.$store.commit('SET_USER_INFO', result.data)
                        this.getCurrentUser()
                        this.$Message.success({
                            content: "上传成功",
                            duration: 2
                        })
                    }
                })
                return false;
            },
            showImage: function () {
                let url = this.userInfo.avatarUrl;
                if (url === 'https://i.loli.net/2017/08/21/599a521472424.jpg') {
                    this.userInfo.showImagesUrl = 'https://i.loli.net/2017/08/21/599a521472424.jpg';
                } else {
                    showImages(url).then(result => {
                        if (result.code === '000000') {
                            this.userInfo.showImagesUrl = 'data:image/png;base64,' + result.data;
                        }
                    })
                }
            },
            modifyUser: function () {
                editUser(this.userInfo).then(result => {
                    if (result.code === '000000') {
                        this.$store.commit('SET_TOKEN', result.data.token)
                        this.$store.commit('SET_USER_INFO', result.data)
                        this.getCurrentUser()
                        this.$Message.success({
                            content: "修改成功",
                            duration: 2
                        })
                    }
                })
            },
            modifyPassword: function () {
                this.changePassword.id = this.userInfo.id;
                this.changePassword.loginName = this.userInfo.loginName;
                if (this.changePassword.newPassword !== this.changePassword.passwordAgain) {
                    this.$Message.warning({content: "两次密码输入不一致", duration: 2})
                    return;
                }
                editUser(this.changePassword).then(result => {
                    if (result.code === '000000') {
                        this.$store.commit('SET_TOKEN', result.data.token)
                        this.$store.commit('SET_USER_INFO', result.data)
                        this.getCurrentUser()
                        this.$Message.success({
                            content: "修改成功,请重新登录",
                            duration: 1
                        })
                        let self = this;
                        setTimeout(function () {
                            self.$router.push({path: "/"})
                        },1000);
                    } else {
                        this.$Message.error({
                            content: result.message,
                            duration: 2
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .card {
        padding: 10px;
        width: 100%;
        height: 100%;
    }

    .center-style {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
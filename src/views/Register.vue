<template>
    <Layout class="register-container">
        <Content class="content-container">
            <Card class="card-container">
                <template slot="title">
                    <p class="title">
                        {{ '欢迎注册' + projectName + '系统' }}
                    </p>
                </template>
                <Form v-model="registerForm" class="register-form">
                    <FormItem>
                        <Input prefix="md-person"
                               size="large"
                               clearable
                               autocomplete="new-password"
                               v-model="registerForm.loginName"
                               placeholder="请输入用户名"></Input>
                    </FormItem>
                    <FormItem>
                        <Input prefix="md-lock"
                               size="large"
                               clearable
                               type="password"
                               autocomplete="new-password"
                               password v-model="registerForm.password"
                               placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Input prefix="md-lock"
                               size="large"
                               clearable
                               type="password"
                               password v-model="registerForm.checkPassword"
                               placeholder="请再次输入密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Input prefix="md-call"
                               size="large"
                               clearable
                               v-model="registerForm.phoneNumber"
                               placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem>
                        <Input prefix="md-bookmark"
                               size="large"
                               clearable
                               v-model="registerForm.realName"
                               placeholder="请输入真实姓名"></Input>
                    </FormItem>
                    <FormItem>
                        <Input prefix="md-bulb"
                               size="large"
                               clearable
                               v-model="registerForm.age"
                               placeholder="请输入年龄"></Input>
                    </FormItem>
                    <FormItem style="width: 100%">
                        <Select clearable prefix="ios-body"
                                size="large"
                                placeholder="请选择性别"
                                class="register-sex"
                                v-model="registerForm.sex">
                            <Option :value="'男'">男</Option>
                            <Option :value="'女'">女</Option>
                            <Option :value="'未知'">未知</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <AutumnButton
                                class="register-btn"
                                @click="doLogin"
                                type="primary">&nbsp;&nbsp;注&nbsp;&nbsp;册&nbsp;&nbsp;
                        </AutumnButton>
                    </FormItem>
                    <FormItem>
                        <a href="javascript:void(0)" @click="$router.push({path: '/login'})">
                            已有账号？返回登录
                        </a>
                    </FormItem>
                </Form>

            </Card>
        </Content>
    </Layout>
</template>

<script>
    import Config from "@/settings"

    const phoneNumberReg = /^1(3\d|4[5-8]|5[0-35-9]|6[567]|7[01345-8]|8\d|9[025-9])\d{8}$/
    import {register} from "@/api/login/loginApi";

    export default {
        name: "register",
        data() {

            return {
                projectName: Config.title,
                registerForm: {
                    age: "",
                    avatarUrl: "https://i.loli.net/2017/08/21/599a521472424.jpg",
                    loginName: "",
                    password: "",
                    checkPassword: "",
                    phoneNumber: "",
                    realName: "",
                    remark: "注册用户",
                    sex: "未知"
                }
            }
        },
        methods: {
            validateLoginForm: function () {
                const {loginName, password, checkPassword, realName, phoneNumber, age, sex} = this.registerForm;
                if (!loginName || !loginName.trim()) {
                    return {valid: false, message: "用户名不能为空"}
                }
                if (!password || !password.trim()) {
                    return {valid: false, message: "密码不能为空"}
                }
                if (!checkPassword || !checkPassword.trim() || checkPassword !== password) {
                    return {valid: false, message: "两次密码输入有误，请重试"}
                }
                if (!phoneNumber || !phoneNumber.trim() || !phoneNumberReg.test(phoneNumber)) {
                    return {valid: false, message: "手机号格式不匹配"}
                }
                if (!realName || !realName.trim()) {
                    return {valid: false, message: "真实姓名不能为空"}
                }
                if (!age || !age.trim()) {
                    return {valid: false, message: "年龄不能为空"}
                }
                if (!sex || !sex.trim()) {
                    return {valid: false, message: "性别不能为空"}
                }

                return {valid: true, message: "success"}
            },
            doLogin: function () {
                const {valid, message} = this.validateLoginForm()
                if (!valid) {
                    this.$Message.error({content: message, duration: 2})
                    return false;
                }
                register(this.registerForm).then(response => {
                    this.$Message.success({content: "注册成功", duration: 2})
                    this.registerForm = {
                        age: "",
                        avatarUrl: "https://i.loli.net/2017/08/21/599a521472424.jpg",
                        loginName: "",
                        password: "",
                        checkPassword: "",
                        phoneNumber: "",
                        realName: "",
                        remark: "注册用户",
                        sex: "未知"
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import '../style/login/register.css';
</style>

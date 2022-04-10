<template>
    <Layout class="login-container">
        <Content class="content-container">
            <Card class="card-container" shadow>
                <template slot="title">
                    <p class="title">
                        {{ '欢迎登录' + projectName + '系统' }}
                    </p>
                </template>
                <Form v-model="loginForm" class="login-form">
                    <FormItem>
                        <Input prefix="md-person"
                               size="large"
                               clearable
                               v-model="loginForm.loginName"
                               placeholder="请输入用户名"></Input>
                    </FormItem>
                    <FormItem>
                        <Input prefix="md-lock"
                               size="large"
                               clearable
                               type="password"
                               password v-model="loginForm.password"
                               placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem>
                        <AutumnButton
                            class="login-btn"
                            @click="doLogin"
                            type="primary">&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;
                        </AutumnButton>
                    </FormItem>
                    <FormItem>
                        <a href="javascript:void(0)" @click="$router.push({path: '/register'})">
                            没有账号？点击注册
                        </a>
                    </FormItem>
                </Form>

            </Card>
        </Content>
    </Layout>
</template>

<script>
import Config from "@/settings"

export default {
    name: "login",
    data() {
        return {
            projectName: Config.title,
            loginForm: {
                loginName: "",
                password: ""
            }
        }
    },
    methods: {
        validateLoginForm: function () {
            const {loginName, password} = this.loginForm;
            if (!loginName || !loginName.trim()) {
                return {valid: false, message: "用户名不能为空"}
            }
            if (!password || !password.trim()) {
                return {valid: false, message: "密码不能为空"}
            }
            return {valid: true, message: "success"}
        },
        doLogin: function () {
            const {valid, message} = this.validateLoginForm()
            if (!valid) {
                this.$Message.error({content: message, duration: 2})
                return false;
            }
            this.$store.dispatch('Login', this.loginForm).then(result => {
                this.$router.push("/navigation")
            })
        }
    }
}
</script>

<style scoped>
@import '../style/login/login.css';
</style>

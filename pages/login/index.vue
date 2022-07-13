<template>
    <div class="content">
        <div class="flex-center">
            <div class="tag pointer" :class="{active: !register}" @click="$router.push({path: '/login'})"><span>登录</span></div>

            <div class="tag pointer" :class="{active: register}" @click="$router.push({path: '/login', query: {type: 'register'}})"><span>注册</span></div>
        </div>
        <div v-if="!register" class="action">
            <a-form :form="formLogin" class="login-form" @submit="handleSubmit">
              <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="['userName', verifyAccount]"
                        placeholder="请输入邮箱"
                        autocomplete="off"
                    >
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="['password', verifyPass]"
                        type="password"
                        placeholder="请输入密码"
                    >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" style="width: 100%" size="large">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>

        <div v-else class="action">
            <a-form :form="formRegister" class="login-form" @submit="handleSubmitRegister">
                <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="['userName', verifyAccount]"
                        placeholder="请输入邮箱"
                        autocomplete="off"
                    >
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="['code', verifyCode]"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        ref="code"
                    >
                        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
                        <span slot="addonAfter" @click="getCode">{{obj.count === 60 ? '获取验证码' : `${obj.count}S`}}</span>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="['password', verifyPass]"
                        type="password"
                        placeholder="请输入密码"
                    >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        size="large"
                        v-decorator="['passwordtwo', verifyPass]"
                        type="password"
                        placeholder="再次输入密码"
                    >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" style="width: 100%" size="large">
                        注册
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
export default {
    layout: 'login',
    computed: {
        register() {
            return this.$route.query.type === 'register'
        }
    },
    data() {
        return {
            verifyAccount: { rules: [{ required: true, message: '请输入账户!' }]},
            verifyCode: { rules: [{ required: true, message: '请输入验证码!' }]},
            verifyPass: { rules: [{ required: true, message: '请输入密码!' }] },
            formLogin: this.$form.createForm(this, {name: 'horizontal_login'}),
            formRegister: this.$form.createForm(this, {name: 'horizontal_register'}),
            obj: {
                switch: false,
                count: 60
            }
        }
    },
    methods: {
        getCode () {
            // this.$api.getCode({})
            if (this.obj.switch) return
            const {userName} = this.formRegister.getFieldsValue()
            this.$api.getCode({account: userName}).then(res => {
                if (res.code === 200) {
                    this.obj.switch = true
                    this.countDown()
                    this.$message.success(res.msg)
                }
            })
        },
        countDown() {
            if (this.obj.count > 0) {
                this.obj.count--
                setTimeout(this.countDown, 1000)
            } else {
                this.obj.switch = false
                this.obj.count = 60
            }
        },
        handleSubmit(e) {
            e.preventDefault();
            this.formLogin.validateFields((err, values) => {
                if (!err) {
                    this.$api.passwordLogin({email: values.userName, password: md5(values.password)}).then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.$message.success(res.msg)
                            this.$store.commit('saveUserInfo', res.data)
                            this.$router.push({path: '/'})
                        }
                    })
                }
            });
        },
        handleSubmitRegister (e) {
            e.preventDefault();
            this.formRegister.validateFields((err, values) => {
                if (!err) {
                    if (values.password !== values.passwordtwo) {
                        this.$message.error('两次输入的密码不正确')
                        return
                    }
                    this.$api.register({email: values.userName, password:  md5(values.password), code: values.code}).then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.$message.success(res.msg)
                            this.$router.push({path: '/login'})
                        }
                    })
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.content {
    width: 420px;
    background-color: #fff;
    border-radius: 10px;
    padding: 32px;
    .flex-center {
        margin-bottom: 16px;
    }
    .tag {
        font-size: 20px;
        margin: 0 8px;
        padding: 0 2px;
        position: relative;
    }
    .active {
        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.65);
        }
        
    }

    .action {
        padding: 0 32px;
    }
}
/deep/ .ant-input-group-addon {
    padding: 0;
    text-align: center;
    span {
        display: inline-block;
        width: 92px;
        line-height: 38px;
        cursor: pointer;
    }
}
</style>
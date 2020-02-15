<template>
  <div class="page-user-chat">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单部分 -->
    <van-cell-group>
      <validationObserver ref="loginFormRef">
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{errors}">
          <van-field
            :error-message="errors[0]"
            v-model="lognFrom.mobile"
            type="text"
            required
            clearable
            label="手机号"
            placeholder="请输入手机号"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            v-model="lognFrom.code"
            type="text"
            required
            clearable
            label="验证码"
            placeholder="请输入验证码"
          >
            <van-button slot="button" type="primary" size="small">发送验证码</van-button>
          </van-field>
        </ValidationProvider>
      </validationObserver>
    </van-cell-group>
    <div class="log-btn">
      <van-button type="info" size="small" round block @click="login()" :loading="isLogin" loading-text="加载中···">登录</van-button>
    </div>
  </div>
</template>

<script>
// 验证相关模块导入
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// 导入api
import { apiUserLogin } from '@/api/user.js'
export default {
  name: 'user-login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      isLogin: false, // 按钮正常
      lognFrom: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 用户登录系统
    async login () {
      const valid = await this.$refs.loginFormRef.validate()
      if (!valid) {
        return false
      }
      // 按钮等待加载
      this.isLogin = true
      try {
        const res = await apiUserLogin(this.lognFrom)
        // console.log(res)
        this.$toast.success('登录成功！') // 提示信息
        // vuex管理token
        this.$store.commit('updateUser', res)
        // 跳转到home页面
        this.$router.push('/')
      } catch (err) {
        // 失败
        this.$toast.fail('手机号或验证码错误！' + err) // 提示信息
      }
      // 成功之后按钮恢复
      this.isLogin = false
    }
  }
}
</script>

<style scoped lang='less'>
// 登录按钮样式
.log-btn {
  padding: 20px;
}
</style>

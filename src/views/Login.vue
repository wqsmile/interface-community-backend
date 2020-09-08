<template>
  <div class="bg">
    <form action="#" class="login">
      <h2>Struggle Breathe.</h2>
      <!-- 用户名 -->
      <div class="username login-input">
        <span class="iconfont icon-user"></span>
        <input
          type="text"
          placeholder="Enter your username"
          v-model="username"
          @blur="validateN"
        >
        <p v-if="validateName">{{ nameTip }}</p>
      </div>
      <!-- 密码 -->
      <div class="password login-input">
        <span class="iconfont icon-mima"></span>
        <input
          type="password"
          placeholder="Enter your password"
          v-model="password"
          @blur="validateP"
          autocomplete="on"
        >
        <p v-if="validatePwd">{{ pwdTip }}</p>
      </div>
      <!-- 忘记密码 -->
      <!-- <div class="forget-pwd">
        <router-link :to="{ name: 'register' }">Click here get the password</router-link>
      </div> -->
      <!-- 登录 -->
      <div class="login-btn">
        <button @click="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import cookie from '@/utils/cookie.js'
import api from '@/http/api.js'

export default {
  data() {
    return {
      username: '',
      password: '',
      validateName: false,
      validatePwd: false,
      nameTip: '',
      pwdTip: ''
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()
      if (this.username === '' || this.password === '') {
        alert('用户名和密码不能为空')
        return
      }
      api.login(this.username, this.password).then(res => {
        // console.log('loginValid', res);
        if (res) {
          if (res.errorCode === 20023) {
            alert(res.msg)
            return
          }
          // console.log(res);
          localStorage.setItem('administrator', res.data.access_token)
          cookie.set('administrator', res.data.access_token)
          // cookie.set('profile', res.data.photo, 86400)
          // console.log(localStorage.getItem('authorization'));
          this.$router.push('/')
        } else {
          alert('登录失败')
        }
      })
    },
    validateN() {
      if (this.username === '') {
        this.nameTip = '用户名不能为空'
        this.validateName = true
      } else {
        this.validateName = false
      }
    },
    validateP() {
      if (this.password === '') {
        this.pwdTip = '密码不能为空'
        this.validatePwd = true
      } else {
        this.validatePwd = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
//  src="@/assets/css/login.less"
@import '~@/assets/css/login.less';
</style>

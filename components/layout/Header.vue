<template>
    <a-layout-header class="header">
      <div class="logo">
        <nuxt-link to="/">我的logo</nuxt-link>
      </div>

      <div class="congfig">
        <img class="pointer" v-if="hasLogin" :src="userInfo.avatar || user">
        <span class="text pointer" v-if="hasLogin">{{userInfo.name}}</span>
        <span class="text" v-else><span class="pointer" @click="toLogin(false)">登录</span>/<span class="pointer" @click="toLogin(true)">注册</span></span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <div class="iconfont icon-config pointer" style="color: #fff;line-height: normal;"></div>
          </a>
          <a-menu slot="overlay">
            <a-menu-item v-if="hasLogin">
              <nuxt-link to="/user">个人中心</nuxt-link>
            </a-menu-item>
            <a-menu-item @click="logout">
              <a>{{hasLogin ? '退出登录' : '登录'}}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-layout-header>
</template>

<script>
import {mapState} from 'vuex'
import user from '~/assets/img/user.png'
export default {
  computed: {
    ...mapState(['userInfo', 'hasLogin'])
  },
  data() {
    return {
      user
    }
  },
  methods: {
    logout() {
      if(this.hasLogin) {
        this.$store.commit('logout')
      }
      this.toLogin()
    },
    toLogin(b) {
      b ? this.$router.push('/login?type=register') : this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
body {
    background-color: #f0f2f5;
}
.header {
  position: fixed;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.logo {
  width: 120px;
  height: 31px;
  text-align: center;
  cursor: context-menu;
  line-height: 30px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  margin: 16px 24px 16px 0;
}
.congfig {
  display: flex;
  align-items: center;
  color: #fff;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: @bg;
      margin-right: 6px;
    }
    .text {
      margin-right: 10px;
    }
}
</style>
<template>
    <a-layout-header class="header">
      <div class="main">
      <div class="logo">
        <nuxt-link to="/">我的logo</nuxt-link>
      </div>

      <div class="congfig">
        <a-auto-complete style="width: 320px;margin-right: 12px" option-label-prop="title" @select="onSelect" @search="handleSearch" placeholder="搜索"  ref="input">
          <template slot="dataSource">
            <a-select-option v-for="(item,index) in dataSource" :key="item.id+ ''" :title="item.title">
              <span><span :class="index < 3 && `hot${index + 1}`">{{index + 1}}. </span>{{item.title}}</span>
              <p class="hint">{{item.describes}}</p>
            </a-select-option>
          </template>
          <a-input>
          <a-button slot="suffix" style="margin-right: -12px" type="primary" @click="handleSearch">
              <a-icon type="search" />
            </a-button>
          </a-input>
        </a-auto-complete>
        <a-space v-if="hasLogin">
          <a-button type="dashed" ghost @click="$router.push('/publish')">发布</a-button>
          <img class="pointer" @click="$router.push('/user')" v-if="hasLogin" :src="userInfo.avatar || user">
          <span class="text">{{userInfo.name}}</span>
        </a-space>
        
        <span class="text" v-else><span class="pointer" @click="toLogin(false)">登录</span>/<span class="pointer" @click="toLogin(true)">注册</span></span>
        <a-dropdown placement="bottomRight">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <div class="iconfont icon-config pointer" style="color: #fff;line-height: normal;"></div>
          </a>
          <a-menu slot="overlay">
            <!-- <a-menu-item v-if="hasLogin">
              <nuxt-link to="/publish">发布帖子</nuxt-link>
            </a-menu-item> -->
            <a-menu-item v-if="hasLogin">
              <nuxt-link to="/user">个人中心</nuxt-link>
            </a-menu-item>
            <a-menu-item @click="logout">
              <a>{{hasLogin ? '退出登录' : '登录'}}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
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
      user,
      value: '',
      dataSource: []
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
    },
    handleSearch() {
      this.$api.getSearch({searchName: this.$refs.input.$children[0].$children[0].$children[0].$children[0].$children[0].$children[0].value}).then(res => {
        this.dataSource = res.data
      })
    },
    onSelect (e, option) {
      console.log(e, option);
      this.$router.push(`/post/${e}`)
      // this.dataSource = []
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 1;
  width: 100%;
  .main {
    min-width: 768px;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
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
    }
    .text {
      margin-right: 10px;
    }
}
.hint {
  font-size: 12px;
  color: #aaa;
  margin-bottom: 0;
}
.hot1 {
  color: #fd434f;
}
.hot2 {
  color: #ff9a02;
}
.hot3 {
  color: #31a0ff;
}
</style>
<style>
body {
  line-height: 1.42857;

}
</style>
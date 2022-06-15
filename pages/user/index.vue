<template>
  <div class="container">
      <div class="background" :style="background">
        <div class="img">
            <img class="avatar" :src="userInfo.avatar" alt="">
            <nuxt-link class="edit" to="/user/setting">修改资料</nuxt-link>
        </div>
      </div>
      <div class="main">
          <p class="info" v-if="userInfo.info">简介：{{userInfo.info}}</p>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['userInfo', 'hasLogin']),
        background() {
            const obj = {
                1: 'background-image: linear-gradient(140deg, #409EFF 0%, #FFF 100%);',
                2: 'background-image: linear-gradient(140deg, #FFF 0%, #F56C6C 100%);',
                3: 'background-image: linear-gradient(140deg, #409EFF 0%, #F56C6C 100%);'
            }
            return obj[this.userInfo.sex] || obj[3]
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    // padding: 20px;
    .background {
        height: 120px;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }
    .img {
        width: 94px;
        height: 94px;
        position: absolute;
        bottom: -18px;
        left: 50%;
        border-radius: 50%;
        transform: translate(-50%, 0);
        padding: 8px;
        background: #fff;
        border-radius: 50%;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        &:hover .edit {
            opacity: 1;
        }
    }
    .edit {
        user-select: none;
        transition: all .3s;
        opacity: 0;
        border: 8px solid #fff;
        border-radius: 50%;
        width: 94px;
        height: 94px;
        line-height: 86px;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.66);
        color: #fff;
    }
    .main {
        padding: 20px;
        .info {
            text-align: center;
        }
    }
}
</style>
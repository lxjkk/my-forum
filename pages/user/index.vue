<template>
  <div class="container">
      <div class="background" :style="{backgroundImage: `url(${background})`}">
        <div class="img">
            <img class="avatar" src="https://tvax1.sinaimg.cn/crop.0.0.751.751.180/0075YT79ly8fpcl4wyovfj30kv0kv0tl.jpg?KID=imgbed,tva&Expires=1653140776&ssig=wYMlzzDiht" alt="">
            <nuxt-link class="edit" to="/user/setting">修改资料</nuxt-link>
        </div>
      </div>
      <div>
          .....
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            background: 'https://s1.hdslb.com/bfs/static/account-fe/static/img/rl_top.35edfde.png'
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
}
</style>
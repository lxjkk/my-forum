<template>
  <div class="main">
    <div class="content-solt">
      <slot />
    </div>
    <div class="sideBar" ref="sideBar">
      <div :class="fiexd && 'fiexd'">
        <div class="card">
          <h3 class="title">热门帖子</h3>
          <p
            v-for="(item, index) in $store.state.hotList"
            :key="index"
            class="list"
          >
            <span class="sign" :class="type[index]">{{ index + 1 }}</span>
            <nuxt-link :to="`/post/`+ item.id">{{ item.title }}</nuxt-link>
          </p>
        </div>

        <div class="card">
          <h3 class="title">推荐阅读</h3>
          <p
            v-for="(item, index) in $store.state.recommendList"
            :key="index"
            class="list"
          >
            <span class="sign" :class="type[index]">{{ index + 1 }}</span>
            <nuxt-link :to="`/post/`+ item.id">{{ item.title }}</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const type = {
  0: 'first',
  1: 'two',
  2: 'three'
}
export default {
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // window.addEventListener('resize', this.getWindowInfo);
    this.width = window.innerWidth
  },
  data() {
    return {
      width: 0,
      type,
      fiexd: false,
      hotList: [],
      recommendList: []
    }
  },
  computed: {
    // fiexdLeft() {
    //   const ma = (this.width - 1000) / 2
    //   return this.width - 300 - ma
    // }
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      // console.log(scrollTop, '滚动距离', this.$refs.sideBar.offsetTop )
      if (scrollTop > this.$refs.sideBar.offsetTop - 64) {
        this.fiexd = true
      } else {
        this.fiexd = false
      }
    }
    // getWindowInfo () {
    //   this.width = window.innerWidth
    // }
  },
  // 滚动重置
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    // window.removeEventListener('resize', this.getWindowInfo);
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  .content-solt {
    width: 740px;
    padding-right: 10px;
  }
  .sideBar {
    width: 260px;
  }
  .card {
    width: 260px;
    padding: 17px;
    background: #fff;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
    margin-bottom: 8px;
    .title {
      padding-left: 6px;
      border-left: 4px solid #1890ff;
      font-weight: 500;
    }
    .list {
      margin-top: 12px;
      position: relative;
      .sign {
        position: absolute;
        width: 30px;
        left: -16px;
        top: 0;
        text-align: right;
        padding: 0 8px;
      }
      .first {
        background: red;
        color: #fff;
      }
      .two {
        background: #ff9a02;
        color: #fff;
      }
      .three {
        background: #31a0ff;
        color: #fff;
      }
      a {
        margin-left: 24px;
      }
    }
  }
  .fiexd {
    position: fixed;
    top: 72px;
  }
}
</style>
<template>
  <div>
    <a-menu class="menu" :selectedKeys="selectedKeys" mode="inline" @select="onSelect">
      <a-menu-item v-for="item in menuList" :key="item.key">
        <a-icon :type="item.type" />
         {{item.name}}
      </a-menu-item>  
    </a-menu>
    <div class="content">
        <nuxt/>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            selectedKeys: [this.$route.path],
            menuList: [{key:'/user', name: '个人中心', type: 'home'}, {key:'/user/setting', name: '我的信息', type: 'user'}]
        }
    },
    watch: {
        '$route'() {
            this.selectedKeys = [this.$route.path]
        }
    },
    methods: {
        onSelect (e) {
            this.$router.push(e.key)
        }
    }
}
</script>

<style lang="less" scoped>
.menu {
    display: inline-block;
    width: 165px;
    border-right: 0;
}
.content {
    width: calc(100% - 169px);
    display: inline-block;
    vertical-align: top;
    border-left: 1px solid #e8e8e8;
    padding-bottom: 40px;
}
</style>
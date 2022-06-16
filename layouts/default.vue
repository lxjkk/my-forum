<template>
  <a-layout id="components-layout-demo-fixed">
    <Header />
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px auto', width: '960px' }">
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <!-- <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item> -->
      </a-breadcrumb>
      <div class="layout-content" :style="{ background: 'initial', width: '960px' }">
        <nuxt/>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Header from '~/components/layout/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="less">
#components-layout-demo-fixed {
  background-image: url('~/static/image/bg.png');
}
 .layout-content {
  background: #fff;
  width: 960px;
  margin: 0 auto;
 }
</style>
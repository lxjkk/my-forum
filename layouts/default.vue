<template>
  <a-layout id="components-layout-demo-fixed">
    <Header />
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <!-- <a-breadcrumb :style="{ margin: '16px auto', width: '1000px' }"> -->
        <!-- <a-breadcrumb-item>主页</a-breadcrumb-item> -->
        <!-- <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item> -->
      <!-- </a-breadcrumb> -->
      <div class="layout-content">
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
    background: none;
  }
 .layout-content {
  width: 1000px;
  margin: 0 auto;
  margin-top: 12px;
 }
</style>
<style>
  body {
  background-image: url('~/static/image/bg.png');
}
</style>
<template>
  <a-layout id="components-layout-demo-fixed">
    <Header />
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <!-- <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item> -->
      </a-breadcrumb>
      <div :style="{ background: '#fff' }">
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
 
</style>
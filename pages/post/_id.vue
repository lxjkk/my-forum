<template>
  <div class="content">
    <!-- 标题 -->
    <h1 class="h1">缺爱的人，一下子就能看出来</h1>
    <!-- 用户信息 -->
    <div class="user">
      <img
        class="avatar"
        src="http://127.0.0.1:2000/static/images/photo/2022-5-1_D52BOYiJp9.png"
        alt=""
      />
      <div class="info">
        <p>哈哈哈</p>
        <a-space class="detail">
          <span>发布于：2022.01.28 21:22:99</span>
          <span>阅读：N次</span>
        </a-space>
      </div>
    </div>
    <!-- 内容 -->
    <div class="html">xxxxx</div>
    <!-- 操作 -->
    <a-space class="handle">
        <a-button type="dashed" shape="circle" icon="like" ghost size="large" />
        <span class="count">1213人点赞</span>
    </a-space>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.content {
  padding: 32px;
  .h1 {
    margin-top: 32px;
    font-size: 30px;
    font-weight: 700;
  }
  .user {
    margin-bottom: 32px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      float: left;
    }
    .info {
      margin-left: 58px;
      p {
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 4px;
      }
      .detail {
        font-size: 13px;
        color: #969696;
      }
    }
  }
  .handle {
    margin-top: 32px;
    color: #969696;
  }
}
/deep/ .ant-btn-background-ghost {
    color: #969696;
    border-color: #969696;
}
/deep/ .ant-btn-dashed:hover, .ant-btn-dashed:focus {
    color: #40a9ff;
    border-color: #40a9ff;
}
</style>
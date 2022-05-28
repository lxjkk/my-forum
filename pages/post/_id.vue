<template>
  <div class="content">
    <!-- 标题 -->
    <h1 class="h1">{{info.title}}</h1>
    <!-- 用户信息 -->
    <div class="user">
      <img
        class="avatar"
        :src="info.avatar"
        alt=""
      />
      <div class="info">
        <p>{{info.name}}</p>
        <a-space class="detail">
          <span>发布于：{{info.issue_time | moment}}</span>
          <span>阅读：{{info.read_count}}次</span>
        </a-space>
      </div>
    </div>
    <!-- 内容 -->
    <div class="html" v-html="info.content"></div>
    <!-- 操作 -->
    <a-space class="handle">
        <a-button :type="info.is_support ? 'primary' : 'dashed'" :loading="loading" shape="circle" icon="like" :ghost="!info.is_support" size="large" @click="support" />
        <span class="count">{{info.support_count}}人点赞</span>
    </a-space>
  </div>
</template>

<script>
import moment from "moment";
export default {
    async asyncData({$api, route}) {
        const res = await $api.getPostInfo({id: route.params.id})
        return {info: res.code === 200 ? res.data : {}}
    },
    filters: {
        moment: (val) => val && moment(val).format('YYYY-MM-DD hh:ss:mm') || ''
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        support() {
            this.loading = true
            this.$api.support({fid: this.info.id}).then((res) => {
                this.loading = false
                if (res.code === 200) {
                    this.$message.success(res.data)
                    if (this.info.is_support) {
                        this.info.support_count -=1
                        this.info.is_support = false
                    } else {
                        this.info.support_count +=1
                        this.info.is_support = true
                    }
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.content {
  padding: 32px;
  margin-bottom: 24px;
  .h1 {
    margin-top: 12px;
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
  .html {
    font-size: 16px;
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
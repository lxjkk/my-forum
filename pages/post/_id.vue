<template>
<SideBar>
  <div class="post-main">
    <div class="content">
      <!-- 标题 -->
      <h1 class="h1">{{ info.title }}</h1>
      <!-- 用户信息 -->
      <div class="user">
        <img class="avatar" :src="info.avatar" alt="" />
        <div class="info">
          <p>{{ info.name }}</p>
          <a-space class="detail">
            <span>发布于：{{ info.issue_time | moment }}</span>
            <span>阅读：{{ info.read_count }}次</span>
          </a-space>
        </div>
      </div>
      <!-- 内容 -->
      <div class="html" v-html="info.content"></div>
      <!-- 操作 -->
      <a-space class="handle">
        <a-button
          :type="info.is_support ? 'primary' : 'dashed'"
          :loading="loading"
          shape="circle"
          icon="like"
          :ghost="!info.is_support"
          size="large"
          @click="support"
        />
        <span class="count">{{ info.support_count }}人点赞</span>
      </a-space>
    </div>

    <div class="comment">
      <a-row>
        <a-col :span="24">
          <a-textarea
            ref="textarea"
            v-model="content"
            placeholder="填入你想说的..."
            :auto-size="{ minRows: 4, maxRows: 4 }"
          />
        </a-col>
        <a-col :span="24" align="end" class="handle">
          <a-space>
            <a-button
              shape="round"
              type="primary"
              :loading="btnLoading"
              @click="publish"
              >发布</a-button
            >
            <a-button shape="round" @click="content = ''">清除</a-button>
          </a-space>
        </a-col>

        <a-col :span="24" class="header">
          <a-space>
            <span>全部评论</span>
            <span>{{ total }}</span>
          </a-space>
        </a-col>

        <template v-if="total">
          <a-col :span="24">
            <replyItem
              v-for="item in commentList"
              @publish="getList"
              :key="item.id"
              :info="item"
            >
              <template v-if="item.comment">
                <replyItem
                  v-for="i in item.comment"
                  :key="i.id"
                  :info="i"
                  is-child
                  @publish="getList"
                />
              </template>
            </replyItem>
          </a-col>

          <a-col :span="24" align="center" class="footer">
            <a-pagination
              :total="total"
              :current="form.page"
              :item-render="itemRender"
              @change="paginationChange"
            />
          </a-col>
        </template>

        <a-col :span="24" v-else>
          <a-empty description="评论空空如也~~~"/>
        </a-col>
      </a-row>
    </div>
  </div>
</SideBar>
</template>

<script>
import moment from 'moment'
import replyItem from '~/components/replyItem'
import SideBar from '~/components/layout/SideBar'
export default {
  components: {
    replyItem,
    SideBar
  },
  async asyncData({ $api, route }) {
    // const res = await $api.getPostInfo({ id: route.params.id })
    return Promise.all([
      $api.getPostInfo({ id: route.params.id }),
      $api.getComment({ id: route.params.id })
    ]).then((res) => {
      return {
        info: res[0].code === 200 ? res[0].data : {},
        commentList: res[1].code === 200 ? res[1].data.list : [],
        total: res[1].code === 200 ? res[1].data.total : 0
      }
    })
    // return { info: res.code === 200 ? res.data : {} }
  },
  filters: {
    moment: (val) => (val && moment(val).format('YYYY-MM-DD HH:ss:mm')) || ''
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      content: '',
      publishBtn: false,
      form: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    getList() {
      this.$api
        .getComment({ id: this.$route.params.id, ...this.form })
        .then((res) => {
          console.log(this.commentList);
          this.commentList = res.data.list
          this.total = res.data.total
        })
    },
    // 点赞
    support() {
      this.loading = true
      this.$api.support({ fid: this.info.id }).then((res) => {
        this.loading = false
        if (res.code === 200) {
          this.$message.success(res.data)
          if (this.info.is_support) {
            this.info.support_count -= 1
            this.info.is_support = false
          } else {
            this.info.support_count += 1
            this.info.is_support = true
          }
        }
      })
    },
    publish() {
      if (!this.content) {
        this.$message.error('请填写评论内容')
        return
      }
      this.btnLoading = true
      this.$api
        .postComment({ id: this.$route.params.id, content: this.content })
        .then((res) => {
          this.btnLoading = false
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.form.page = 1
            this.content = ''
            this.getList()
          }
        })
    },
    itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return
      } else if (type === 'next') {
        return <a-button shape="round">下一页</a-button>
      }
      return originalElement
    },
    paginationChange(page) {
      this.form.page = page
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  background: #fff;
  padding: 32px;
  margin-bottom: 12px;
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
.comment {
  background: #fff;
  padding: 32px;
  margin-bottom: 24px;
  .handle {
    margin-top: 16px;
    margin-bottom: 36px;
  }
  .header {
    border-left: 4px solid #1890ff;
    font-size: 18px;
    padding-left: 12px;
    margin-bottom: 16px;
  }
  .footer {
    margin-top: 36px;
    margin-bottom: 8px;
    /deep/ .ant-pagination-item {
      border-radius: 50%;
    }
  }
}
/deep/ .ant-btn-background-ghost {
  color: #969696;
  border-color: #969696;
}
/deep/ .ant-btn-dashed:hover,
.ant-btn-dashed:focus {
  color: #40a9ff;
  border-color: #40a9ff;
}
</style>
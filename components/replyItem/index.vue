<template>
  <div class="main" :class="isChild && 'border-main'">
    <div class="avatar-content float">
      <img :src="info.avatar || user" />
    </div>
    <div class="container">
      <a-row style="">
        <a-col :span="24" class="nickname">{{ info.name }}</a-col>
        <a-col :span="24" class="date">{{ info.create_time | moment }}</a-col>
        <a-col :span="24" class="content">
          <nuxt-link to="/index" v-if="isChild">@{{ info.to_name }}</nuxt-link>
          {{ info.content }}
        </a-col>
        <a-col :span="24" class="item-text-bar">
          <div class="flex-align">
            <div class="flex-align span" :class="info.is_support && 'action'">
              <span class="iconfont icon-sup"></span>
              <span>{{ info.support_count }}</span>
            </div>
            <div class="flex-align span" @click="showComment">
              <span
                :class="showTextarea && 'action'"
                class="iconfont icon-news"
              ></span>
              <span>{{ info.read_count }}</span>
            </div>
          </div>
        </a-col>
        <transition name="fade-transform" mode="out-in">
          <div style="width: 100%" v-if="showTextarea">
            <a-col :span="24" class="handle">
              <a-textarea
                ref="textarea"
                v-model="content"
                placeholder="填入你想说的..."
                :auto-size="{ minRows: 3, maxRows: 6 }"
              />
            </a-col>
            <a-col :span="24" align="end" class="handle">
              <a-space>
                <a-button
                  shape="round"
                  type="primary"
                  :disabled="!content"
                  :loading="btnLoading"
                  @click="publish"
                  >回复</a-button
                >
                <a-button shape="round" @click="content = '';showTextarea = false"
                  >取消</a-button
                >
              </a-space>
            </a-col>
          </div>
        </transition>
      </a-row>
    </div>
    <div style="padding-left: 50px">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import user from '~/assets/img/user.png'
import moment from 'moment'
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isChild: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    moment: (val) => (val && moment(val).format('YYYY-MM-DD hh:ss:mm')) || ''
  },
  data() {
    return {
      user,
      showTextarea: false,
      content: '',
      btnLoading: false
    }
  },
  methods: {
    showComment () {
        this.showTextarea = true
        this.$nextTick(() => {
            this.$refs.textarea.focus()
        })
    },
    publish() {
        console.log(this.info);
      this.btnLoading = true
      this.$api
        .postReply({
          id: this.isChild && this.info.id,
          comment_id: !this.isChild && this.info.id,
          content: this.content
        })
        .then((res) => {
          this.btnLoading = false
          if (res.code === 200) {
              this.content = ''
              this.$emit('publish')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 22px;
}
.main {
  .float {
    float: left;
    margin-top: 3px;
  }
  .border-main {
          margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    .container {
      margin-bottom: 0;
      border-bottom: none;
    }
  }
  .container {
    border-bottom: 1px solid #eee;
    padding-bottom: 16px;
    margin-left: 50px;
    margin-bottom: 20px;
    .nickname {
      font-size: 15px;
      font-weight: 500;
    }
    .date {
      margin-top: 2px;
      font-size: 12px;
      color: #969696;
    }
    .content {
      margin-top: 10px;
      font-size: 16px;
      line-height: 1.5;
      word-break: break-word;
    }
    .item-text-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      margin-top: 12px;
      line-height: 20px;
      .flex-align {
        div {
          margin-right: 6px;
          &:nth-child(3) {
            margin-right: 0;
          }
        }

        .span {
          cursor: pointer;
          &:hover {
            color: #1890ff;
          }
        }
        .action {
          color: #1890ff;
        }
      }
    }
    .handle {
      margin-top: 16px;
    }
  }
  .avatar-content {
    width: 38px;
    height: 38px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #d6d5d5;
    }
    &:hover::after {
      opacity: 1;
    }
    &::after {
      content: '查看';
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s;
      font-size: 12px;
      user-select: none;
      position: absolute;
      color: #fff;
      top: 0;
      left: 0;
      line-height: 38px;
      text-align: center;
      border-radius: 50%;
      background: #121212;
      width: 100%;
      height: 100%;
    }
  }
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
  overflow: hidden;
}

.fade-transform-enter {
  opacity: 0;
  height: 0px;
}
.fade-transform-enter-to {
  height: 160px;
}

.fade-transform-leave {
  height: 160px;
}
.fade-transform-leave-to {
  height: 0px;
}
</style>
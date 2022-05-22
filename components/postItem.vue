<template>
  <div class="post-item">
      <div class="item-title">
          <nuxt-link class="link" to="/"><h2><span v-text="postInfo.title"></span></h2></nuxt-link>
      </div>
      <div class="post-content">
          <span>{{postInfo.content | str}}</span>
      </div>
      <div class="item-text-bar">
          <div style="display: flex">
            <img :src="postInfo.avatar || user">
            <nuxt-link class="link" to="/"><span>{{postInfo.name}}</span></nuxt-link>
          </div>
          <div class="flex-align">
              <div class="flex-align span" :class="postInfo.is_support && 'action'" @click="support">
                  <span class="iconfont icon-sup"></span>
                  <span>{{postInfo.support_count}}</span>
              </div>
              <div class="flex-align span">
                  <span class="iconfont icon-view"></span>
                  <span>{{postInfo.read_count}}</span>
              </div>
              <!-- <div class="flex-align span">
                  <span class="iconfont icon-news"></span>
                  <span>{{postInfo.support_count}}</span>
              </div> -->
          </div>
      </div>
  </div>
</template>

<script>
import user from '~/assets/img/user.png'
export default {
    props: {
        postInfo: {
            type: Object,
            default: {}
        }
    },
    filters: {
        str(e) {
            return e && e.replace(/<[^>]+>/g,"");
        }
    },
    data() {
        return {
            user
        }
    },
    methods: {
        support() {
            this.$api.support({fid: this.postInfo.id}).then((res) => {
                if (res.code === 200) {
                    this.$message.success(res.data)
                    if (this.postInfo.is_support) {
                        this.postInfo.support_count -=1
                        this.postInfo.is_support = false
                    } else {
                        this.postInfo.support_count +=1
                        this.postInfo.is_support = true
                    }
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.iconfont {
    font-size: 18px;
    line-height: 0;
}
.post-item {
    padding: 18px 24px 13px 24px;
    background: #fff;
    border-bottom: 1px solid #f4f4f4;
    position: relative;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%);
    .item-title {
        h2 {
            font-size: 18px;
            font-weight: bold;
            line-height: 24px;
            height: 24px;
            margin-bottom: 0;
            overflow: hidden;
            white-space: nowrap;
            span &:hover {
                color: #334454;
            }
        }
    }
    .post-content {
        color: #8a8a8a;
        font-size: 14px;
        line-height: 24px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: normal;
    }
    .item-text-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .link {
            span {
                color: #3d3d3d;
            }
        }
        img {
            display: block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            object-fit: cover;
            overflow: hidden;
            margin-right: 6px;
        }
    }
    &:hover {
        background: #fafafa;
    }
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
</style>
<template>
  <div class="post-item">
      <template v-if="!loading">
        <a-space class="avatar">
            <div class="avatar-content">
                <img :src="postInfo.avatar || user">
            </div>
            <span class="link">{{postInfo.name}}</span>
            <!-- <nuxt-link class="link" :to="`/post/${postInfo.id}`"></nuxt-link> -->
        </a-space>
        <div class="item-title">
            <h2><nuxt-link class="link" :to="`/post/${postInfo.id}`"><span v-text="postInfo.title"></span></nuxt-link></h2>
        </div>
        <div class="post-content">
            <div class="img" v-if="postInfo.image">
                <img @click="$router.push(`/post/${postInfo.id}`)" :src="postInfo.image" alt="">
            </div>
            <span><nuxt-link class="content" :to="`/post/${postInfo.id}`">{{postInfo.describes}}</nuxt-link></span>
        </div>
        <div class="item-text-bar">
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
      </template>
      <a-skeleton v-else avatar active :paragraph="{ rows: 3 }" />
  </div>
</template>

<script>
import user from '~/assets/img/user.png'

export default {
    props: {
        postInfo: {
            type: Object,
            default: () => {}
        },
        loading: {
            type: Boolean,
            default: false
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
    font-size: 24px;
    line-height: 0;
}
.link {
    color: #3d3d3d;
}
.avatar {
    margin-bottom: 8px;
    .avatar-content {
        width: 38px;
        height: 38px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid #d6d5d5
        }
        &:hover::after {
            opacity: 1;
        }
        &::after {
            content: '查看';
            cursor: pointer;
            opacity: 0;
            transition: all .3s;
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
    .link {
        font-weight: bold;
    }
}
.post-item {
    padding: 20px 16px;
    background: #fff;
    border-bottom: 1px solid #f6f6f6;
    position: relative;
    .item-title {
        margin-bottom: 6px;
        h2 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 0;
            line-height: 1.6;
            overflow: hidden;
            white-space: nowrap;
            span {
                &:hover {
                    color: #1890ff;
                }
            }
        }
    }
    .post-content {
        font-size: 15px;
        line-height: 1.67;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        white-space: normal;
        overflow: hidden;
        .img {
            cursor: pointer;
            width: 190px;
            height: 100px;
            margin-right: 18px;
            float: left;
            border-radius: 4px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .content {
            color: #121212;
            &:hover {
                color: #646464;
            }
        }
    }
    .item-text-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        margin-top: 6px;
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
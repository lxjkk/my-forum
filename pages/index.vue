<template>
  <div>
    <postItem v-for="item in postList" :key="item.id" :postInfo="item" />
  </div>
</template>

<script>
export default {
  async asyncData({$api}) {
    const res = await $api.getPost({page:1,limit:10})
    return {postList: res.data.list, postCount: res.data.count, form: {page:2,limit:10}}
  },
  data() {
    return {
      isAchiveBottom: false,
      form: {
        page:2,
        limit:10
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scroll, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll, false);
  },
  methods: {
    async postApi() {
      const {data} = await this.$api.getPost(this.form)
      this.postList = this.postList.concat(data.list)
      this.postCount = data.count
      this.postList.length !== this.postCount && this.form.page ++
    },
    scroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight>= scrollHeight - 20 && !this.isAchiveBottom && this.postList.length < this.postCount) {
        this.isAchiveBottom = true;
        // 获取当前展示列表数据
        this.postApi()
      }
    },
  }
}
</script>

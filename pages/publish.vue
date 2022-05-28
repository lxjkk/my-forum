<template>
  <div class="content">
    <div class="handle">
      <a-button type="primary" @click="publish">发布</a-button>
    </div>
    <a-input placeholder="请输入标题" style="margin-bottom: 12px" v-model="form.title"></a-input>
    <div id="editor"></div>
  </div>
</template>

<script>
import $cookies from 'vue-cookies'
let $wangeditor = {}
// wangeditor 富文本编辑器
if (process.client) {
  $wangeditor = require('wangeditor')
}
export default {
  data() {
    return {
      editor: '',
      form: {
        title: '',
        content: ''
      }
    }
  },
  mounted() {
    this.editor = new $wangeditor('#editor')
    this.editor.config.showLinkImg = false
    this.editor.config.uploadImgServer = 'http://127.0.0.1:2000/api/utils/upload'
    this.editor.config.uploadImgHeaders = {
        'token': $cookies.get('LC-Token')
    }
    const that = this
    this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        resultFiles.forEach(async item => {
            const data = await that.getPictureBase64(item)
            const formData = new FormData()
            formData.append('file', item)
            formData.append('base64Data', data)
            const res = await that.$api.upload(formData)
            if (res.code === 200) {
                insertImgFn(res.data)
            }
        })
    }
    this.editor.create()
  },
  methods: {
    // 文件转化为base64
    getPictureBase64 (file)  {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        });
    },
    publish () {
      this.loading = true
      this.form.content = this.editor.txt.html()
      this.$api.postPublish(this.form).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$router.push(`/post/${res.data}`)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 0 16px 16px;
}
.handle {
  padding: 24px 0
}
/deep/ .w-e-text-container {
  min-height: 550px;
}
</style>
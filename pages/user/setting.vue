<template>
  <div class="container">
    <a-form
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      style="max-width: 700px"
    >
      <a-form-item label="头像">
        <a-space class="space-custom">
          <img
            class="avatar"
            :src="form.avatar"
            alt=""
          />
          <a-upload name="file" :multiple="true" :fileList="[]" accept="image/*" @change="fileChange">
            <a-button> <a-icon type="upload" /> 点击上传 </a-button>
          </a-upload>
        </a-space>
      </a-form-item>
      <a-form-item label="用户名">
        <a-input class="form-input" v-model="form.name" placeholder="您的用户名"></a-input>
      </a-form-item>
      <a-form-item label="签名">
        <a-textarea
        v-model="form.info"
          placeholder="设置您的签名"
          :autoSize="{ minRows: 4, maxRows: 6 }"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="性别">
        <a-radio-group v-model="form.sex">
          <a-radio :value="1"> 男 </a-radio>
          <a-radio :value="2"> 女 </a-radio>
          <a-radio :value="3"> 保密 </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="出生日期">
        <a-date-picker v-model="form.birthday" placeholder="选择日期" />
      </a-form-item>
    </a-form>

    <div class="edit">
      <a-button type="primary" @click="sub">保存</a-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            form: {avatar: undefined, birthday: undefined, info: undefined, name: undefined, sex: null}
        }
    },
    mounted() {
        this.$api.getUserInfo().then(res => {
            console.log(res);
            const {avatar, birthday, info, name, sex} = res.data
            this.form = {avatar, birthday: moment(birthday), info, name, sex}
        })
    },
    methods: {
        async fileChange(e) {
            console.log(e.file);
            const data = await this.getPictureBase64(e.file.originFileObj)
            const formData = new FormData()
            formData.append('file', e.file.originFileObj)
            formData.append('base64Data', data)
            console.log(formData);
            this.$api.upload(formData).then(res => {
                if (res.code === 200) {
                    this.form.avatar = res.data
                    this.$message.success(res.msg)
                }
            })
        },
        // 文件转化为base64
        getPictureBase64 (file)  {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            });
        },
        sub () {
            const form = Object.assign({}, this.form)
            console.log(form.birthday);
            form.birthday  && (form.birthday = form.birthday.format('YYYY-MM-DD'))
            console.log(form);
            this.$api.editUserInfo(form).then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.$message.success(res.msg)
                    // this.
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  .avatar {
      border: 1px solid #bbb;
      width: 98px;
      height: 98px;
      border-radius: 50%;
  }
  .form-input {
    width: 225px;
  }
  .edit {
    text-align: center;
    padding-top: 20px;
    button {
      width: 80px;
    }
  }
  .space-custom {
      align-items: flex-end;
  }
}
</style>
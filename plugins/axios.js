import Vue from "vue";
import apiEntire from "@/api";

export default ({ app, $axios, $cookies, redirect }, inject) => {
  $axios.defaults.baseURL = "http://127.0.0.1:2000";
  $axios.defaults.timeout = 5000;

  $axios.interceptors.request.use(config => {
      if($cookies.get('token')){
          config.headers['token'] = $cookies.get('token')
      }
      return config
  },err=>{
      return Promise.reject(err)
  })

  $axios.interceptors.response.use(response => {
      if (response.data.code !== 200) {
              const p = new Vue()
              p.$message.error(response.data.msg);
              response.data.code === 202 && $cookies.remove('token')
      }
      if (response.data.token) {
        $cookies.set('token',response.data.token)
      }
      return Promise.resolve(response.data)
  },err=> {
      return Promise.reject(err)
  })
  const API = {};
  for (const i in apiEntire) {
    // 调用api时候的参数
    // 第一位为 post参数 第二位为get参数
    API[i] = function(data) {
      const { url, method, headers } = { ...apiEntire[i] };
      const type = method.toUpperCase() === 'POST'
      return $axios({
        url,
        method,
        headers,
        data: type && data,
        params: !type && data
      });
    };
  }
  app.api = API;
  inject("api", API);
}

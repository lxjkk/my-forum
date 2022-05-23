import Vue from "vue";
import apiEntire from "@/api";
// import axiosBasic from "~/utils/http";

export default ({ app, $axios, $cookies, redirect }, inject) => {
  $axios.defaults.baseURL = "http://127.0.0.1:2000";
  $axios.defaults.timeout = 10000;

  $axios.interceptors.request.use(config => {
      if($cookies.get('LC-Token')){
          config.headers['token'] = $cookies.get('LC-Token')
      }
      return config
  },err=>{
      return Promise.reject(err)
  })

  $axios.interceptors.response.use(response => {
      if (response.data.code !== 200) {
              const p = new Vue()
              p.$message.error(response.data.msg);
              response.data.code === 202 && $cookies.remove('LC-Token')
      }
      if (response.data.token) {
        $cookies.set('LC-Token',response.data.token, { maxAge: 60 * 60 * 24 * 7 })
      }
      return Promise.resolve(response.data)
  },err=> {
      return Promise.reject(err)
  })
  // const axios = axiosBasic($axios, $cookies)
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

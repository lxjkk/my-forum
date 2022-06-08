// 客户端导入请求方式（主要服务于store，进行客户端请求，注：plugins/axios文件中已经将所有api挂载到vue原型中）
import $axios from 'axios'
import $cookies from 'vue-cookies'
import Vue from "vue";
console.log(11111111, process.env.baseUrl);
$axios.defaults.baseURL = process.env.baseUrl;
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
    console.log(333,response.data);
    if (response.data.code !== 200) {
            const p = new Vue()
            p.$message.error(response.data.msg);
            response.data.code === 202 && $cookies.remove('LC-Token')
    }
    if (response.data.token) {
        $cookies.set('LC-Token',response.data.token, { expires: 7 })
    }
    return Promise.resolve(response.data)
},err=> {
    return Promise.reject(err)
})


export default $axios
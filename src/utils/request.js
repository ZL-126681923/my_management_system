import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui';
// 创建一个新的axios实例
const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,//区分不同的环境发送不同的请求
  timeout: 10000
})
// 请求拦截器
server.interceptors.request.use((config) => {
  //注入token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})
// 响应拦截器
server.interceptors.response.use((response) => {
  const { data, message, success } = response.data
  console.log(response.data);
  if (success) {
    return data
  } else {
    Message({type: 'error', message})  
    return Promise.reject(new Error(message))
  }
},(error) => {
    debugger
    Message({type:'error', message: error.message  })
    return Promise.reject(error)
  })
export default server
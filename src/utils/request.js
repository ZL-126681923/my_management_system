/*
 * @Date: 2024-06-26 16:07:46
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-08 12:54:02
 * @FilePath: \My-admin\src\utils\request.js
 */
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000
}) // 创建一个新的axios实例
// 成功1 失败2
service.interceptors.request.use((config) => {
  // 注入token
  //  this.$store.getters
  // store.getters.token => 请求头里面
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // axios默认包裹了data
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, (error) => {
  if (error.response.status === 401) {
    Message({ type: 'warning', message: 'token超时了请重新登录' })
    //token超时了调用退出登录
    store.dispatch('user/logout')
    //主动跳转到登录页
    router.push('/login')
    return Promise.reject(error)
  }
  // error.message
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service

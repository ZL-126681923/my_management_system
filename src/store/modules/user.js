/*
 * @Date: 2024-06-26 15:59:53
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-08 12:48:04
 * @FilePath: \My-admin\src\store\modules\user.js
 */
/*
 用户接口 13800000002 hm#qd@23!
 1.点击登陆时调用login方法
 2.调用login时设置token(并同步到Cookies实现持久化缓存)
 3.使用Vue-cli解决跨域问题
 4.封装axios实现请求拦截器功能(请求时注入token)与响应拦截器功能(解构数据以及错误处理)
 5.处理开发环境以及生产环境对应的api请求
 6.实现登录
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
const state = {
  token: getToken(),// 从缓存中读取初始值
  userInfo: {}//用户数据
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 删除Vuex的token
    state.token = null
    removeToken()
  },
  setUserlnfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  //登录接口 context上下文，传入参数
  async login(context, data) {
    // todo: 调用登录接口
    const token = await login(data)
    // 返回一个token 123456
    context.commit('setToken', token)
  },
  // 获取用户的基本信息
  async getUserInfo(context) {
    const result = await getUserInfo()
    console.log(result);
    context.commit('setUserlnfo', result)
  },
  // 退出登录接口
  logout(context) {
    context.commit('removeToken')//删除token
    context.commit('setUserlnfo',{})//清空用户信息
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}

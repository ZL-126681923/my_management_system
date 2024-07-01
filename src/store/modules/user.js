/*
 用户接口
 1.点击登陆时调用login方法
 2.调用login时设置token(并同步到Cookies实现持久化缓存)
 3.使用Vue-cli解决跨域问题
 4.封装axios实现拦截器功能(请求时注入token)
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state, token) {
    state.token = null
    removeToken(token)
  }

}
const actions = {
  // context 上下文 data传入参数
  async login(context, data) {
    console.log(context);
    context.commit('setToken', '123456')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
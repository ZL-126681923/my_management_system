/*
 * @Date: 2024-06-26 16:07:46
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-03 18:31:04
 * @FilePath: \My-admin\src\permission.js
 */
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

/**
 *前置守卫
 *判断是否有token(有) => 如果跳转是登录页(直接跳转首页)不是就判断并获取用户信息
 *（无）是否是白名单是就放过不是则跳转到登陆页
*/
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/') // 中转到主页
      // next（地址）并没有执行后置守卫
      nprogress.done()
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next() // 放过
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login') // 中转到登录页
      nprogress.done()
    }
  }
})

/** *
 * 后置守卫
 * **/
router.afterEach(() => {

  nprogress.done()
})

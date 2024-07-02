/*
 * @Date: 2024-06-26 16:07:46
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-02 17:52:21
 * @FilePath: \My-admin\src\permission.js
 */
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

/**
 *前置守卫
 *
*/
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/') // 中转到主页
      // next（地址）并没有执行后置守卫
      nprogress.done()
    } else {
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
  console.log('123')
  nprogress.done()
})

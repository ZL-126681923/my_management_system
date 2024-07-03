/*
 * @Date: 2024-06-26 16:07:46
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-03 11:54:26
 * @FilePath: \My-admin\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store

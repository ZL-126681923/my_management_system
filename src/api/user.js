/*
 * @Date: 2024-06-26 16:07:46
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-10 12:55:51
 * @FilePath: \My-admin\src\api\user.js
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
export function getUserInfo() {
  return request({
    url: '/sys/profile'
  })
}
export function updatedPassword(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}


/*
 * @Date: 2024-07-23 14:44:40
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-24 11:32:51
 * @FilePath: \My-admin\src\api\role.js
 */
import request from '@/utils/request'

/** *
 * 获取角色列表
 * **/
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}
/**
 * 新增角色
 *
**/
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
/**
 * 更新角色
 * 
 ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
/** *
 * 删除角色
 *
 * **/
export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
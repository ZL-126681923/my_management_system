/*
 * @Date: 2024-07-11 17:11:57
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-16 18:49:54
 * @FilePath: \My-admin\src\api\department.js
 */
import request from '@/utils/request'
// 获取组织架构数据
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}
/** * *  获取部门负责人的数据 * **/
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
* 新增组织
* ***/
export function addDepartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}
/**
 * 获取部门详情
 *
 * ***/
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
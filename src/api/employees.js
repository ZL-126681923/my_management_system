/*
 * @Date: 2024-07-27 23:14:22
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-08-04 15:24:06
 * @FilePath: \My-admin\src\api\employees.js
 */
import request from '@/utils/request'

/*
 *获取员工数据
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params // 地址参数 查询参数
  })
}
/**
 * 导出员工的excel
 *
 *  **/
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}
/**
 * 下载员工导入模版
 *
  **/
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob' // 二进制文件流
  })
}
/**
 * 上传用户的excel
 *
*/
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // form-data类型 因为要上传文件类型
  })
}
/**
 * 删除员工
 *
 * **/
export function delEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}
// 新增员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
/**
 *  获取员工详情
 *
  **/

export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
//更新员工信息
export function updateEmployee(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
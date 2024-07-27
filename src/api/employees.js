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
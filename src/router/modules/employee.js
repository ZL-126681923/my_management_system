/*
 * @Date: 2024-07-10 13:45:31
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-31 12:27:36
 * @FilePath: \My-admin\src\router\modules\employee.js
 */
import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }, {
    path: '/employee/detail/:id?', // 员工详情的地址
    component: () => import('@/views/employee/detail.vue'),
    hidden: true, // 表示隐藏在左侧菜单
    meta: {
      title: '员工详情' // 显示在导航的文本
    }
  }]
}
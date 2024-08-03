<!--
 * @Date: 2024-08-03 22:26:16
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-08-03 22:26:38
 * @FilePath: \My-admin\src\views\employee\components\select-tree.vue
-->
<template>
  <!-- element-ui级联组件 -->
  <el-cascader size="mini" :options="treeData" :props="props" separator="-" />
</template>
<script>
import { getDepartment } from "@/api/department";
import { transListToTreeData } from "@/utils";
export default {
  data() {
    return {
      treeData: [], // 赋值给 级联组件的options
      props: {
        label: "name", // 要展示的字段
        value: "id", // 要存储的字段
      },
    };
  },
  created() {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      this.treeData = transListToTreeData(await getDepartment(), 0); // 将组织架构的数据 转化树形赋值给treeData
    },
  },
};
</script>
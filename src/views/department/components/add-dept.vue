<!--
 * @Date: 2024-07-12 15:09:08
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-12 15:09:34
 * @FilePath: \My-admin\src\views\department\components\add-deps.vue
-->
<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close"> </el-dialog>
</template>
<script>
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

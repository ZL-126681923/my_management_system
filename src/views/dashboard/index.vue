<!--
 * @Date: 2024-06-26 16:07:46
 * @LastEditors: zl weixin_67448099@noreply.gitcode.com~
 * @LastEditTime: 2024-06-26 18:46:01
 * @FilePath: \vue-admin-template\src\views\dashboard\index.vue
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- 使用svg图标 -->
    <svg-icon icon-class="example" />
    <svg-icon icon-class="drag" />
    <svg-icon icon-class="drag" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

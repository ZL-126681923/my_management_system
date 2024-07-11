<template>
  <div class="container">
    <div class="app-container">
     <el-tree default-expand-all :data="depts" :props="defaultProps"></el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data(){
    return{
      depts:[{
        name:'xxx有限公司',
        children:[
        {name:'总裁办'},
        {name:'行政部'},
        {name:'财务部'},
        ]
      }],
      defaultProps:{
        label:'name',
        children:'children'
      }
    }
  }
}
</script>
<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
<!--
 * @Date: 2024-07-10 13:46:26
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-16 18:47:10
 * @FilePath: \My-admin\src\views\department\index.vue
-->
<template>
  <div class="container">
    <div class="app-container">
      <el-tree
        default-expand-all
        :expand-on-click-node="false"
        :data="depts"
        :props="defaultProps"
      >
        <!-- 节点结构 -->
        <!-- v-slot="{ node, data }" 只能作用在template -->
        <template v-slot="{ data }">
          <el-row
            style="width: 100%; height: 40px"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- $event 实参 表示类型 -->
              <el-dropdown @command="operateDept($event, data.id)">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <add-dept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :currentNodeId="currentNodeId"
      @updateDepartment="getDepartment"
    />
    <!-- 这里我们同样使用了sync修饰符，可以监听子组件传过来的 update:属性名的事件，直接将父组件的值进行修改 -->
  </div>
</template>
<script>
import { getDepartment } from "@/api/department";
import { transListToTreeData } from "@/utils/index";
import AddDept from "./components/add-dept";
export default {
  name: "Department",
  components: {
    AddDept,
  },
  data() {
    return {
      currentNodeId: null, //存储当前点击的id
      depts: [],
      defaultProps: {
        label: "name",
        children: "children",
      },
      showDialog: false,
    };
  },
  created() {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      let result = await getDepartment();
      this.depts = transListToTreeData(result, 0);
    },
    // 操作部门方法
    operateDept(type, id) {
      if (type === "add") {
        // 添加子部门
        this.showDialog = true; // 显示弹层
        this.currentNodeId = id;
      } else if (type === "edit") {
        // 编辑部门场景
        this.showDialog = true;
        this.currentNodeId = id; // 记录id 要用它获取数据
        // 更新props- 异步动作
        // 直接调用了子组件的方法 同步的方法
        // 要在父组件中调用子组件方法
        //this.$nextTick等到数据渲染完成后调用方法
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail(); // this.$refs.addDept等同于子组件的this
        });
      }
    },
  },
};
</script>
<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin-right: 44px;
}
</style>
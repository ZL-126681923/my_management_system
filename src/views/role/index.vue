<!--
 * @Date: 2024-07-10 13:46:26
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-07-24 12:22:52
 * @FilePath: \My-admin\src\views\role\index.vue
-->
<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button
          size="mini"
          type="primary"
          class="btn"
          @click="showDialog = true"
          >新增角色</el-button
        >
      </div>
      <!-- 放置table组件 -->
      <el-table :data="list" border highlight-current-row>
        <!-- 放置列 -->
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" size="mini"></el-input>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            <span>
              {{
                row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无"
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template v-slot="{ row }">
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text" @click="btnEditRow(row)"
              >编辑</el-button
            >
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" style="height: 60px" align="middle" justify="end">
        <!-- 放置分页组件 -->
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev, pager, next"
          @current-change="changePage"
          background
        />
      </el-row>
    </div>
    <!-- 添加用户弹层  @close关闭时的自定义事件-->
    <el-dialog
      width="500px"
      title="新增角色"
      :visible.sync="showDialog"
      @close="btnCancel()"
    >
      <!-- 表单内容 -->
      <el-form
        label-width="120px"
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
      >
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width: 300px" size="mini" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <!-- 设置active-value和inactive-value属性,表示切换时双向绑定的值
              prop属性如果不校验表单则不需要,但如果要重置表单的话也还是需要的
            -->
          <el-switch
            size="mini"
            v-model="roleForm.state"
            :active-value="1"
            :inactive-value="0"
            active-color="red"
            inactive-color="pink"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            type="textarea"
            :rows="3"
            style="width: 300px"
            size="mini"
            v-model="roleForm.description"
          />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOK()"
                >确定</el-button
              >
              <el-button size="mini" @click="btnCancel()">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, addRole } from "@/api/role";
export default {
  name: "Role",
  data() {
    return {
      list: [],
      showDialog: false,
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0, //请求条数
      },
      roleForm: {
        name: "",
        description: "",
        state: 0, // 默认未1启用 关闭 0 打开1
      },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "角色描述不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams);
      this.list = rows; //拿到数据
      this.pageParams.total = total;
      // 针对每一行数据添加一个编辑标记
      this.list.forEach((item) => {
        // item.isEdit = false // 添加一个属性 初始值为false
        // 数据响应式的问题  数据变化 视图更新
        // 添加的动态属性 不具备响应式特点
        // this.$set(目标对象, 属性名称, 初始值) 可以针对目标对象 添加的属性 添加响应式
        this.$set(item, "isEdit", false);
      });
    },
    // 切换分页时 请求新的数据
    changePage(newPage) {
      this.pageParams.page = newPage; // 赋值当前页码
      this.getRoleList();
    },
    // 确定与取消按钮
    btnOK() {
      this.$refs.roleForm.validate(async (isOK) => {
        if (isOK) {
          await addRole(this.roleForm);
          this.$message.success("新增角色成功");
          this.getRoleList();
          this.btnCancel();
        }
      });
    },
    btnCancel() {
      this.$refs.roleForm.resetFields(); // 重置表单数据
      this.showDialog = false; // 关闭弹层
    },
    // 点击编辑行
    btnEditRow(row) {
      row.isEdit = true; // 改变行的编辑状态
    },
  },
};
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
.btn {
  border-radius: 20%;
}
</style>
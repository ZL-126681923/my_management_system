<!--
 * @Date: 2024-07-10 13:46:26
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-08-04 21:33:20
 * @FilePath: \My-admin\src\views\employee\index.vue
-->
<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom: 10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="changeValue"
        />
        <!-- 树形组件 -->
        <el-tree
          ref="deptTree"
          node-key="id"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push('/employee/detail')"
            >添加员工</el-button
          >
          <el-button size="mini" @click="showExcelDialog = true"
            >excel导入</el-button
          >
          <el-button size="mini" @click="exportEmployee()">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list" border>
          <el-table-column prop="staffPhoto" align="center" label="头像">
            <template v-slot="{ row }">
              <img
                v-if="row.staffPhoto"
                style="width: 40px; height: 40px; border-radius: 50%"
                src="@/assets/common/avatar.jpg"
              />
              <span v-else class="username">{{
                row.username.charAt(4)
                  ? row.username.charAt(4)
                  : row.username.charAt(0)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机号" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>暂无信息</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column label="操作" width="280px">
            <template v-slot="{ row }">
              <el-button
                size="mini"
                type="text"
                @click="$router.push(`/employee/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button size="mini" type="text">角色</el-button>
              <el-popconfirm
                title="确认删除该行数据吗？"
                @onConfirm="confirmDel(row.id)"
              >
                <el-button
                  slot="reference"
                  style="margin-left: 10px"
                  size="mini"
                  type="text"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
            background
          />
        </el-row>
      </div>
    </div>
    <importExcel
      :showExcelDialog.sync="showExcelDialog"
      @uploadSuccess="getEmployeeList"
    />
  </div>
</template>

<script>
import { getDepartment } from "@/api/department";
import { transListToTreeData } from "@/utils";
import { getEmployeeList, exportEmployee, delEmployee } from "@/api/employees";
import FileSaver from "file-saver";
import ImportExcel from "./components/import-excel.vue";
export default {
  name: "Employee",
  components: {
    ImportExcel,
  },
  data() {
    return {
      depts: [], // 组织数据
      defaultProps: {
        label: "name",
        children: "children",
      },
      // 存储查询参数
      queryParams: {
        departmentId: null,
        page: 1, //当前页码
        pagesize: 10, //每页条数
        keyword: "", //模糊查询的字段
      },
      total: 0, //记录员工总数
      list: [], //接收员工数据
      showExcelDialog: false, // 控制excel的弹层显示和隐藏
    };
  },
  created() {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      // 递归方法 将列表转化成树形
      // let result = await getDepartment()
      this.depts = transListToTreeData(await getDepartment(), 0);
      this.queryParams.departmentId = this.depts[0].id;
      // 设置选中节点
      // 树组件渲染是异步的 等到更新完毕
      this.$nextTick(() => {
        // 此时意味着树渲染完毕
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId);
      });
      // 这个时候参数 记录了id可以调用获取员工数据的方法了
      this.getEmployeeList();
    },
    // 获取员工列表的方法
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.queryParams);
      rows.forEach((item) => {
        if (item.username.includes("黑马")) {
          item.username = item.username.replace("黑马", "");
        }
      });
      this.list = rows;
      this.total = total;
    },
    // 切换部门时修改查询部门id并查询第一页数据
    selectNode(node) {
      this.queryParams.departmentId = node.id; //记录点击的部门id
      this.queryParams.page = 1; //查询第一页的数据
      this.getEmployeeList();
    },
    // 切换页码
    changePage(newPage) {
      this.queryParams.page = newPage; // 赋值新页码
      this.getEmployeeList(); // 查询数据
    },
    //实现模糊查询
    changeValue() {
      // 单位时间内只执行最后一次
      // this的实例上赋值了一个timer的属性
      clearTimeout(this.timer); // 清理上一次的定时器
      this.timer = setTimeout(() => {
        this.queryParams.page = 1;
        this.getEmployeeList();
      }, 300);
    },
    //导出员工信息
    async exportEmployee() {
      const result = await exportEmployee(); // 导出所有的员工接口
      // console.log(result); // 使用一个npm包 直接将blob文件下载到本地 file-saver
      // FileSaver.saveAs(blob对象,文件名称)
      FileSaver.saveAs(result, "员工信息表.xlsx"); // 下载文件
    },
    // 删除员工方法
    async confirmDel(id) {
      await delEmployee(id);
      // 判断当前页是否还有数据
      // 如果没有数据 需要查询上一页的数据(考虑到第一页的情况)
      if (this.list.length === 1 && this.queryParams.page > 1)
        this.queryParams.page--;
      this.getEmployeeList();
      this.$message.success("删除员工成功");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin: 10px;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04c9be;
      font-size: 12px;
      display: inline-block;
    }
  }
}
</style>
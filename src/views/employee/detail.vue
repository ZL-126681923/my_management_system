<!-- 员工详情 -->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form
          ref="userForm"
          :model="userInfo"
          :rules="rules"
          label-width="220px"
        >
          <!-- 姓名 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="userInfo.username"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 工号 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <!-- 工号是系统生成的  禁用这个组件-->
                <el-input
                  v-model="userInfo.workNumber"
                  disabled
                  placeholder="工号由系统生成"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input
                  v-model="userInfo.mobile"
                  :disabled="!!$route.params.id"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <!-- 放置及联部门组件 会单独封装-->
                <selectTree class="inputW" v-model="userInfo.departmentId" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select
                  v-model="userInfo.formOfEmployment"
                  size="mini"
                  class="inputW"
                >
                  <el-option label="正式" :value="1" />
                  <el-option label="非正式" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  v-model="userInfo.timeOfEntry"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker
                  v-model="userInfo.correctionTime"
                  size="mini"
                  type="date"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 员工照片 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <!-- 放置上传图片 -->
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 保存个人信息 -->
          <el-row type="flex">
            <el-col :span="12" style="margin-left: 220px">
              <el-button size="mini" type="primary" @click="saveData"
                >保存更新</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import selectTree from "./components/select-tree.vue";
import { addEmployee,getEmployeeDetail,updateEmployee} from "@/api/employees";

export default {
  components: {
    selectTree,
  },
  created() {
    // 如何获取路由参数的中id
    // if (this.$route.params.id) { this.getEmployeeDetail() }
    this.$route.params.id && this.getEmployeeDetail()
  },
  data() {
    return {
      userInfo: {
        username: "", // 用户名
        mobile: "", // 手机号
        workNumber: "", // 工号
        formOfEmployment: null, // 聘用形式
        departmentId: null, // 部门id
        timeOfEntry: "", // 入职时间
        correctionTime: "", // 转正时间
      },
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "姓名为1-4位",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            //   pattern 正则表达式
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "请选择聘用形式", trigger: "blur" },
        ],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        timeOfEntry: [
          { required: true, message: "请选择入职时间", trigger: "blur" },
        ],
        correctionTime: [
          { required: true, message: "请选择转正时间", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.timeOfEntry) {
                if (new Date(this.userInfo.timeOfEntry) > new Date(value)) {
                  callback(new Error("你入职前就转正了吗？"));
                  return;
                }
              }
              callback();
            },
          },
        ],
      },
    };
  },
  methods: {
    // 点击保存信息
    saveData() {
      this.$refs.userForm.validate(async isOK => {
        if (isOK) {
          // 校验通过判段是编辑模式还是新增模式
          if (this.$route.params.id) {
            // 编辑模式
            await updateEmployee(this.userInfo)
            this.$message.success('更新员工成功')
          } else {
            // 新增模式
            await addEmployee(this.userInfo)
            this.$message.success('新增员工成功')
          }
          this.$router.push('/employee')
        }
      })
    },
    // 查看员工详情
    async getEmployeeDetail() {
      let data = await getEmployeeDetail(this.$route.params.id)
      if(data.username.includes('黑马')){
        data.username = data.username.replace('黑马','')
      }
      this.userInfo = data

     
    }
  },
};
</script>

<style scoped lang="scss">
.edit-form {
  background: #fff;
  padding: 20px;
  .inputW {
    width: 380px;
  }
}
</style>
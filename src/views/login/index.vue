<!--
 * @Date: 2024-06-26 16:07:46
 * @LastEditors: 张良 1077167261@qq.com
 * @LastEditTime: 2024-06-27 11:18:24
 * @FilePath: \My-admin\src\views\login\index.vue
-->
<template>
  <div class="login-container">
    <div class="logo">
      <h2>欢迎来到人力资源管理系统</h2>
    </div>
    <div class="form">
      <el-card shadow="hover" class="login-card">
        <h1>登录</h1>
        <!--登录表单
           :model="loginForm":需要传入的数据
           :rules="loginRules":需要传入的验证规则
           prop="phone"需要验证的字段
        -->
        <el-form ref="form" :model="loginForm" :rules="loginRules">
          <el-form-item prop="phone">
            <el-input
              v-model="loginForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">
              已阅读平台用户使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 350px" type="primary" @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
        isAgree: false,
      },
      loginRules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@#$%^&*?!]{6,10}$/,
            message: "密码6~10位必须有大小写可以有特殊字符",
            trigger: "blur",
          },
        ],
        // required只能检查 null "" undefined
        isAgree: [
          {
            validator: (rule, value, callback) => {
              // rule规则
              // value检查的数据 true/false
              // callback 函数 执行这个函数
              // 成功执行callback 失败也执行callback(错误对象 new Error(错误信息))
              // console.log(value);
              value ? callback() : callback(new Error("没有勾选用户平台协议"));
            },
          },
        ],
      },
    };
  },
  methods: {
    login() {
      //通过this.$refs.form.validate()来验证整个表单的有效性，或者通过
      this.$refs.form.validate((isOK) => {
        if (isOK) {
          alert("校验通过");
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    padding: 200px 100px;
    h2 {
      box-shadow: 0 0 5px #ccc;
      color: #e2e1e4;
    }
    h2:hover {
      cursor: pointer;
    }
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 150px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 146px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      // margin-bottom: 20px;
      .el-input__icon {
        line-height: 44px;
      }
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>

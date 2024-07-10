<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar" />
          <!-- name?.charAt(0)使用链式询问避免报错  -->
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <!-- 用户名 -->
          <span class="name">{{ name }}</span>
          <!-- 图标 -->
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://gitee.com/zlaxx/my_management_system"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a
            target="_blank"
            @click.prevent="updatePassword"          
          >
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native修饰符给原生标签挂载事件 -->
          <el-dropdown-item @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 
    dialog 弹出层
      sync可以接收到子组件传递的值
      label-width	表单域标签的宽度,作为 Form 直接子元素的 form-item 会继承该值。支持 auto
    el-form 表单
      ref指向表单元素 :model 数据 :rules 规则
      -->
     <el-dialog width="500px" title="修改密码" @close="btnClose" :visible.sync="showDialog">
      <el-form ref="passFrom" label-width="100px" :model="passFrom" :rules="rules" >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input  show-password size="small" v-model="passFrom.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input  show-password size="small" v-model="passFrom.newPassword"/>
        </el-form-item>
        <el-form-item label="重复密码" prop="confirmPassword">
          <el-input  show-password size="small" v-model="passFrom.confirmPassword"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="btnOK" >确认修改</el-button>
          <el-button size="mini" @click="btnClose">取消</el-button>
        </el-form-item>
      </el-form>
     </el-dialog>
  </div>
</template>

<script>
//
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { updatedPassword } from "@/api/user";
export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data(){
    return {
      showDialog : false,
      passFrom:{
        oldPassword: '', // 旧密码
        newPassword: '', // 新密码
        confirmPassword: '' // 确认密码字段
      },
      rules:{
        oldPassword: [{required:true,message:'旧密码不能为空',trigger:'blur'}], 
        newPassword: [{required:true,message:'新密码不能为空',trigger:'blur'},{
          trigger:'blur',
          min:6,
          max:16,
          message:'新密码应该在6~16位之间'
        }],
        confirmPassword: [{require:true,message:'重复密码不能为空',trigger:'blur'},{
          trigger:'blur',
          validator:(rule,value,callback)=>{
            // 要用箭头函数不然this不会指向vue实例
            if(this.passFrom.newPassword === value){
              callback()
            }else{
              callback(new Error('两次输入的密码不一致'))
            }
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push('/login')
    },
    updatePassword(){
      this.showDialog = true
    },
    btnOK(){
      this.$refs.passFrom.validate(async isOK=>{
        if(isOK){
          //调用更新密码接口并且重置表单
           await updatedPassword(this.passFrom)
           this.$message.success('修改密码成功')
           this.btnClose()
        }
      })
    },
    btnClose(){
      // 重置表单并且关闭弹窗
      this.$refs.passFrom.resetFields()
      this.showDialog = false
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .username {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: #fff;
          margin-right: 4px;
        }
        .name {
          //  用户名称距离右侧距离
          margin-right: 10px;
          font-size: 16px;
        }
        .el-icon-setting {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
}
</style>

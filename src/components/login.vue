<template>
  <div class="log">
    <el-card class="logCard">
        <div class="logo">
          <img alt="logo" src="../assets/logo.png">
        </div>
        <el-form :model="logRuleForm" :rules="rules" ref="logRuleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item class="logformitem"  prop="username">
            <el-input prefix-icon="iconfont icon-user" v-model="logRuleForm.username" ></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input prefix-icon="iconfont icon-3702mima" v-model="logRuleForm.password"></el-input>
          </el-form-item>
          <el-form-item class="logbtn">
            <el-button type="primary" @click="submitForm('logRuleForm')">登录</el-button>
            <el-button @click="resetForm('logRuleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logRuleForm: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (data) {
      this.$refs[data].resetFields()
    }
  }
}
</script>

<style scoped>
.log{
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2B4B6B;
}
.logCard{
width: 450px;
height: 300px;
}
.logbtn{
  display: flex;
  justify-content: flex-end;
}
.logo {
  width:140px;
  height: 140px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  position:absolute;
  left:50%;
  transform:translate(-50%,-60%);
}
.logformitem{
  margin-top: 90px;
}
.logo img{
  width:120px;
  height: 120px;
  background-color: #EEEEEE;
  border-radius: 50%;
}
</style>

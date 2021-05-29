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
            <el-input show-password prefix-icon="iconfont icon-3702mima" v-model="logRuleForm.password"></el-input>
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
  data(){
    return{
      logRuleForm:{
        username:'',
        password:'',
      },
      rules:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
      },
    }
  },
  methods:{
    submitForm(data){
      this.$refs[data].validate(async(valid) => {
          if (valid) {
            const {data:res} = await this.$http.post('login',this.logRuleForm);
            if(res.meta.status!==200){
              this.$message.error('登录失败！')
            }else{
              // 将登陆成功后的token令牌保存在sessionStorage
              window.sessionStorage.setItem('token',res.data.token);
              //跳转
              this.$router.push('/home')
            }
          } else {
            return false;
          }
        });
    },
    resetForm(data){
      this.$refs[data].resetFields();
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
  width:110px;
  height: 110px;
  background-color: #EEEEEE;
  border-radius: 50%;
}
</style>

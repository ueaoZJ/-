<template>
  <div>
    <el-breadcrumb  class="bianju" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
          class="bianju"
          :data="rightData"
          border
          stripe>
          <el-table-column
          type='index'
          label='#'>
          </el-table-column>
          <el-table-column
            prop="authName"
            label="权限名称">
          </el-table-column>
          <el-table-column
            prop="path"
            label="路径">
          </el-table-column>
          <el-table-column
            label="权限等级">
            <template v-slot="scope">
              <el-tag v-if="scope.row.level==0">一级</el-tag>
              <el-tag v-else-if="scope.row.level==1" type="success">二级</el-tag>
              <el-tag v-else type="warning">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>


<script>
export default {
  data(){
    return{
      rightData:[]
    }
  },
  methods:{
    async getRightList(){
      const {data:res} = await this.$http.get('rights/list')
      if(res.meta.status!==200){
        return this.$message.error('获取用户列表数据失败！')
      }
      this.rightData = res.data;
    }
  },
  mounted(){
    this.getRightList();
  }
}
</script>

<style scoped>
.bianju{
  margin-bottom: 20px;
}
</style>

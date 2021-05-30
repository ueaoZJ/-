<template>
  <div>
    <el-breadcrumb class="bianju" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button @click="adddialogVisible=true" type="primary" class="bianju">添加角色</el-button>
      <!--  -->
      <el-table
          class="bianju"
          :data="roleData"
          border
          style="width: 100%">
          <el-table-column type="expand">
            <!-- 展开 -->
            <template v-slot="scope">
              <el-row :class="['bdbottom',i1===0?'bdtop':'','vcenter']" v-for="(itemone,i1) in scope.row.children" :key="itemone.id">
                <el-col :span="4">
                  <el-tag @close='removeRightById(scope.row,itemone.id)' closable>{{itemone.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-row :class="[i2===0?'':'bdtop','vcenter']" v-for="(itemtwo,i2) in itemone.children" :key="itemtwo.id">
                    <el-col :span="8">
                      <el-tag @close='removeRightById(scope.row,itemtwo.id)' closable type="success">{{itemtwo.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="16">
                      <el-tag @close='removeRightById(scope.row,itemthree.id)' class="disan" closable type="warning" v-for="itemthree in itemtwo.children" :key="itemthree.id">
                        {{itemthree.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
          type='index'
          label='#'>
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="roleDesc"
            label="角色描述">
          </el-table-column>
          <el-table-column
            label="操作"
            width="400px">
            <template v-slot="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button @click="setclick(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button @click="deleted(scope.row.id)" type="danger" icon="el-icon-seardeletech">删除</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
                <el-button @click="allot(scope.row)" type="warning" icon="el-icon-setting">分配权限</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
    </el-card>

    <!-- 添加角色 -->
    <el-dialog
      title="添加角色"
      :visible.sync="adddialogVisible"
      @close="setRoleDialogClosed"
      width="50%">
      <el-form :model="addRuleForm" ref="addRuleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRuleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色信息" prop="roleDesc">
          <el-input v-model="addRuleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editdialogVisible"
      @close="editRoleDialogClosed"
      width="50%">
      <el-form :model="editRuleForm" ref="editRuleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID" prop="id">
          <el-input v-model="editRuleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRuleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色信息" prop="roleDesc">
          <el-input v-model="editRuleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="fpdialogVisible"
      @close="fpRoleDialogClosed"
      width="50%">

        <!-- :data表示数据源 ，通过：props实现父子树-->
        <el-tree ref="treeRef" :default-checked-keys='defKeys'
        default-expand-all node-key='id' show-checkbox
        :data="rightslist" :props="treeProps"></el-tree>


      <span slot="footer" class="dialog-footer">
        <el-button @click="fpdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fp()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      roleData:[],
      adddialogVisible:false,
      addRuleForm:{
        roleName:'',
        roleDesc:''
      },
      editdialogVisible:false,
      editRuleForm:{
        id:'',
        roleName:'',
        roleDesc:''
      },
      fpdialogVisible:false,
      rightslist:[],
      treeProps:{
        label:'authName',
        children:'children'
      } ,
       // 默认选中的节点的id值
      defKeys:[],
      roleId:"",
    }
  },
  mounted(){
    this.getRoleData()
  },
  methods:{
    fpRoleDialogClosed(){
      this.defKeys=[]
    },
    async fp(){
       //拿到所有半选和权限状态下的id
      const keys = [
          ...this.$refs.treeRef.getCheckedKeys(),
          ...this.$refs.treeRef.getHalfCheckedKeys()
      ]

      //将数组变成用逗号隔开的字符串
      const idStr = keys.join(',')

      const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{
           rids:idStr
      })
       if(res.meta.status !==200){
          return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.getRoleData()
      this.fpdialogVisible=false;
    },
    async allot(row){
      const {data:res}=await this.$http.get('rights/tree')
      if(res.meta.status!==200){
        return this.$message.error('获取权限数据失败')
      }
      this.roleId = row.id
      // 把获取到的权限数据保存到data中
      this.rightslist=res.data
      this.getLeafKeys(row,this.defKeys)
      this.fpdialogVisible=true
    },
    //通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys中
    getLeafKeys(node,arr){
        // 如果当前node节点部包含children属性，则是三级节点
        if(!node.children){
            // 向arr数组中添加id
            return arr.push(node.id)
        }
        node.children.forEach(item=>
        this.getLeafKeys(item,arr))
    },
    async edit(){
      const {data:res} = await this.$http.put('roles/'+this.editRuleForm.id,{
        roleName:this.editRuleForm.roleName,roleDesc:this.editRuleForm.roleDesc
      })
      if(res.meta.status!==200){
        return this.$message.error('编辑失败！')
      }
      this.$message.success('编辑成功！')
      this.getRoleData()
      this.editdialogVisible=false
    },
    // 删除
    async deleted(id){
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        const { data: res } = await this.$http.delete('roles/' + id)
        if (res.meta.status !== 200) {
          return this.$message.error('删除角色失败!')
        }
        this.$message.success('删除角色成功！')
        this.getRoleData()
      }).catch(err => {
        return err
      }
      )
    },
    //
    setclick(dd){
      this.editdialogVisible=true
      this.editRuleForm=dd
    },
    editRoleDialogClosed(){
      this.editRuleForm={}
    },
    async add(){
      const {data:res} = await this.$http.post('roles',this.addRuleForm)
      if(res.meta.status!==201){
        return this.$message.error('添加角色失败！')
      }
      this.$message.success('添加角色成功！')
      this.getRoleData()
      this.adddialogVisible = false
    },
    setRoleDialogClosed(){
      this.addRuleForm={}
    },
    //
    async removeRightById(role,rightId){
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => {
          return err
        });

        if(result !=='confirm'){
          return this.$message.info('已经取消删除')
        }
        const {data:res}=await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if(res.meta.status !==200){
            return this.$message.error('删除权限失败！')
        }
        this.$message.success('删除权限成功！')
        role.children = res.data
        this.getRoleData()
    },
    //获取数据
    async getRoleData(){
      const {data:res} = await this.$http.get('roles')
      if(res.meta.status!==200){
        this.$message.error('获取角色信息失败！')
      }
      this.roleData = res.data
    },
  }
}
</script>

<style scoped>
.bianju{
  margin-bottom: 20px;
}
.bdtop{
  border-top:1px solid #eee
}
.vcenter{
  display:flex;
  align-items:center;
}
.bdbottom{
  border-bottom:1px solid #eee
}
.disan{
  margin: 5px 10px 10px 0px;
}
</style>

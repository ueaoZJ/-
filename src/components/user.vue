<template>
  <div>
    <el-breadcrumb class="bianju" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="bianju" :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="adddialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 内容 -->
      <el-table
          class="bianju"
          :data="userData"
          border
          style="width: 100%">
          <el-table-column
          type='index'
          label='#'>
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="mg_state"
            label="状态">
            <template v-slot="scope">
              <el-switch @change="switchMT(scope.row)" v-model="scope.row.mg_state"></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="300px">
            <template v-slot="scope">
              <el-tooltip class="item" effect="dark" content="修改角色" placement="top">
                <el-button @click="setclick(scope.row)" type="primary" icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                <el-button @click="deleted(scope.row.id)" type="danger" icon="el-icon-delete"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                <el-button @click="allot(scope.row)" type="warning" icon="el-icon-setting"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddialogVisible"
      width="50%">
      <el-form :model="addRuleForm" :rules="rules" ref="addRuleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addRuleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addRuleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addRuleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addRuleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog
      title="修改用户"
      :visible.sync="setdialogVisible"
      width="50%">
      <el-form :model="setRuleForm" :rules="rules" ref="setRuleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="setRuleForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="setRuleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="setRuleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="set()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="allotdialogVisible"
      width="50%">

      <p>当前的用户：{{allotData.username}}</p>
      <p>当前的角色：{{allotData.role_name}}</p>
      <p>分配新角色：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </p>

      <span slot="footer" class="dialog-footer">
        <el-button @click="allotdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotTrue()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 角色
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      // 分配
      allotdialogVisible: false,
      allotData: {
        username: '',
        role_name: ''
      },
      // 修改
      setdialogVisible: false,
      setRuleForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 添加
      adddialogVisible: false,
      addRuleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]

      },
      // 总数
      total: 0,
      queryInfo: {
        // 关键字，可以为孔
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页的数据
        pagesize: 2
      },
      userSearch: '',
      userData: [],
      userSwitch: ''

    }
  },
  methods: {
    //
    allot (data) {
      this.allotdialogVisible = true
      this.allotData = data
      console.log('dd:', data)
    },
    allotTrue () {
      this.allotdialogVisible = false
    },
    // 删除
    async deleted (id) {
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        const { data: res } = await this.$http.delete('users/' + id)
        if (res.meta.status !== 200) {
          return this.$message.error('删除用户失败!')
        }
        this.$message.success('删除用户成功！')
        this.getUserList()
      }).catch(err => {
        return err
      }
      )
      // if(result !=='confirm'){
      //   return this.$message.info('已经取消删除')
      // }
      // const {data:res} = await this.$http.delete('users/'+id)
      // if(res.meta.status!==200){
      //     return this.$message.error('删除用户失败!')
      // }
      // this.$message.success('删除用户成功！')
      // this.getUserList()
    },
    // 修改
    setclick (res) {
      this.setdialogVisible = true
      this.setRuleForm = res
    },
    async set () {
      const { data: res } = await this.$http.put(`users/${this.setRuleForm.id}`, { email: this.setRuleForm.email, mobile: this.setRuleForm.mobile })
      if (res.meta.status !== 200) {
        this.setdialogVisible = false
        return this.$message.error('修改失败！')
      }
      this.getUserList()
      this.setdialogVisible = false
      return this.$message.success('修改成功！')
    },
    // 添加
    async add () {
      const { data: res } = await this.$http.post('users', this.addRuleForm)
      if (res.meta.status !== 201) {
        this.adddialogVisible = false
        return this.$message.error('添加用户失败')
      }
      this.getUserList()
      this.adddialogVisible = false
      return this.$message.success('用户添加成功')
    },
    //
    async clickSearch () {
      this.queryInfo.pagenum = 1
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('用户查询失败！')
      }
      this.total = res.data.total
      this.userData = res.data.users
    },
    async switchMT (userInfo) {
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status != 200) {
        return this.$message.error('状态改变失败！')
      }
      this.$message.success('状态改变成功！')
    },
    // 获取用户信息
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error('获取用户列表数据失败！')
      }
      this.total = res.data.total
      this.userData = res.data.users
    },
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getUserList()
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style scoped>
.bianju{
  margin-bottom: 20px;
}
</style>

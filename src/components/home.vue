<template>
  <el-container class="homeBox">
      <el-header>
        <div class="navLeft">
          <img src="../assets/db1.png" alt="" width="80px" height="65px">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="exit">退出</el-button>
      </el-header>
      <!-- 主要内容 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse?'64px':'200px'">
          <div class="homeSS" @click="SS">
            |||
          </div>
          <el-menu background-color='#333744' text-color='#fff'
          active-text-color='#409bff' :default-active="activeURL" :router="true"
          class="el-menu-vertical-demo" @open="handleOpen"
          @close="handleClose" :collapse="isCollapse">
            <el-submenu :index="item.id+''" v-for="item in menuData" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span> {{item.authName}}</span>
              </template>
              <el-menu-item @click="saveNavState('/'+itemTwo.path)" :index="'/'+itemTwo.path" v-for="itemTwo in item.children" :key="itemTwo.id">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{itemTwo.authName}}</span>
                  </template>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 内容 -->
        <el-main>
          <div><router-view/></div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      menuData: [], // 商品列表数据
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      activeURL: ''// 当前激活的URL
    }
  },
  created () {
    this.getMenu()
  },
  updated () {
    this.activeURL = window.sessionStorage.getItem('activeURL')
  },
  methods: {
    saveNavState (url) {
      window.sessionStorage.setItem('activeURL', url)
    },
    handleOpen () {

    },
    handleClose () {

    },
    async getMenu () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuData = res.data
    },
    exit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    SS () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.homeBox{
  height: 100%;
}
.el-aside{
  background-color: #333744;
  transition: .3s;
}
.el-header{
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.el-header .navLeft{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.homeSS{
  background-color:#4A5064;
  font-size:10px;
  line-height:24px;
  color:#fff;
  text-align: center;
  letter-spacing:0.1em;
}
</style>

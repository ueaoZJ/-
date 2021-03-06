import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-ui
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体库
import './assets/fonts/iconfont.css'
// 导入阿贾克斯
import axios from 'axios'
// 拦截token
axios.interceptors.request.use(config => {
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'// 配置请求的根路径
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

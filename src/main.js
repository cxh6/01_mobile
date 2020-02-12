import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Vant
import Vant from 'vant'
// 导入vant样式
import 'vant/lib/index.css'
// 导入amfe-flexible
import 'amfe-flexible/index.min.js'
// 导入全局css样式
import '@/assets/css/global.less'
// 注册vant
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

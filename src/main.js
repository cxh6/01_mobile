import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Vant
import Vant, { Lazyload } from 'vant'
// 导入vant样式
import 'vant/lib/index.css'
// 导入amfe-flexible
import 'amfe-flexible/index.min.js'
// 导入全局css样式
import '@/assets/css/global.less'
// 导入验证相关模块
import '@/utils/validate.js'
// 导入过滤器
import * as filters from '@/utils/filters.js'
// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 注册图片懒加载
Vue.use(Lazyload)
// 注册vant
Vue.use(Vant)
Vue.config.productionTip = false
// 延迟器
Vue.prototype.$sleep = time => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const USER_KEY = 'hm-toutiao-m-user'

export default new Vuex.Store({
  state: {
    // 通过 || 设定，如果localStorage没有数据，就返回{}空对象
    user: JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  mutations: {
    // 修改/更新用户信息
    updateUser (state, data) {
      state.user = data // vuex更新
      localStorage.setItem(USER_KEY, JSON.stringify(data)) // localStorage做持久更新
    },
    clearUser (state, data) {
      state.user = {} // vuex清除
      localStorage.removeItem(USER_KEY) // localStorage做持久清除
    }
  },
  actions: {
  },
  modules: {
  }
})

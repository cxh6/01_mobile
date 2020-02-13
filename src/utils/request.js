import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
// 导入路由，使得可以执行路由跳转
import router from '@/router/index.js'
// 创建一个axios实例和原来的axios没有关系
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 请求完毕的数据【转换器】，超大整型数字做转换处理的
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
// --------配置**请求**拦截器，来处理token传递操作
instance.interceptors.request.use(function (config) {
  // 发送请求的相关逻辑
  // 判断token是否存在，存在再做配置
  if (store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// ---------配置**响应**拦截器，来处理服务器端token过期操作,401错误，以及data
// token时效为2小时
instance.interceptors.response.use(function (response) {
  // 响应的相关逻辑
  // 服务端有时返回data，有时返回data.data
  try {
    return response.data.data
  } catch {
    return response.data
  }
}, function (error) {
  // 非正常响应相关逻辑(包括401)
  // console.dir(error)
  // 判断当前错误是不是401
  if (error.response.status === 401) {
    // if (error.response.status === 401 && confirm('该账号已过期，请重新登录')) {
    // 强制用户重新登陆，从而重新刷新token
    router.push('/login')
    // 不要做错误提示
    return new Promise(function () { }) // 空的promise对象，不执行catch，从而不做错误提示
  }
  return Promise.reject(error)
})
export default instance

import request from '@/utils/request.js'
// api方法
// ------ 用户登录系统api
export function apiUserLogin ({ mobile, code }) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

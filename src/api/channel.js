import request from '@/utils/request.js'
// api方法
// ------ 频道列表
export function apiChannelList () {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

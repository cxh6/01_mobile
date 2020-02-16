import request from '@/utils/request.js'
// api方法
// ------ 文章列表
export function apilArticleList ({ channel_id, timestamp }) {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id,
      timestamp,
      with_top: 1
    }
  })
}

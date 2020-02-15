<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">内容 1</van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入api
import { apiChannelList } from '@/api/channel.js' // 频道列表api
export default {
  name: 'home-index',
  data () {
    return {
      channelList: [], // 频道列表
      activeChannelIndex: 0 // 默认激活的项目 下标从0开始
    }
  },
  created () {
    // 频道列表
    this.getChannelList()
  },
  methods: {
    // 频道列表
    async getChannelList () {
      const res = await apiChannelList()
      // console.log(res)
      this.channelList = res.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>

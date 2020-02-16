<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 瀑布流效果 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in articleList" :key="item.aut_id" :title="item.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入api
import { apilArticleList } from '@/api/article'
export default {
  name: 'com-article',
  props: {
    // 接收父组件传递过来的频道id数据
    channelID: {
      typr: Number,
      required: true
    }
  },
  data () {
    return {
      ts: Date.now(), // 时间戳
      articleList: [], // 文章列表
      // 下拉刷新相关成员
      isLoading: false,
      // 瀑布流相关成员
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.getArticleList() // 文章列表
  },
  methods: {
    // 文章列表
    async getArticleList () {
      const res = await apilArticleList({
        channel_id: this.channelID,
        timestamp: this.ts
      })
      // console.log(res)
      this.articleList = res.results
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.onLoad() // 获取数据一次
        this.isLoading = false // 暂停拉取
        this.$toast('刷新成功')
      }, 1000)
    },
    // 瀑布流效果
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
// 给上拉列表设置样式
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}
</style>

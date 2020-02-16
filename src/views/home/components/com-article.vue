<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 瀑布流效果 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- 超大整型数字 -->
        <!-- <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title" /> -->
        <!-- 单元格 -->
        <van-cell-group>
          <van-cell v-for="item in articleList" :key="item.art_id.toString()" title="item.title">
            <!-- 使用 title 插槽来自定义标题 -->
            <template slot="label">
              <!-- 宫格 -->
              <van-grid :border="false" v-if="item.cover.type>0" :column-num="item.cover.type">
                <van-grid-item v-for="(item2,k2) in item.cover.images" :key="k2">
                  <!-- 图片懒加载 -->
                  <van-image lazy-load width="90" height="90" :src="item2" />
                </van-grid-item>
              </van-grid>
              <p>
                <!-- 右侧小叉号,传递当前点击的文章id -->
                <van-icon name="close" style="float:right" @click="displayDialog(item.art_id.toString())" />
                <span>作者:{{item.aut_name}}</span>
                &nbsp;
                <span>评论 :{{item.comm_count}}</span>
                &nbsp;
                <!-- 使用过滤器 -->
                <span>时间:{{item.pubdate|formatTime}}</span>
                &nbsp;
              </p>
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <!-- 更多操作组件位置(举报、不感兴趣弹出框) -->
    <more-action v-model="showDialog" :articleID='nowArticleID' @dislikeSuccess="handleDislikeSuccess"></more-action>
  </div>
</template>

<script>
// 导入组件
import MoreAction from './com-moreaction.vue'
// 导入api
import { apilArticleList } from '@/api/article'
export default {
  name: 'com-article',
  components: {
    MoreAction
  },
  props: {
    // 接收父组件传递过来的频道id数据
    channelID: {
      typr: Number,
      required: true
    }
  },
  data () {
    return {
      nowArticleID: '', // 不感兴趣文章的id
      showDialog: false, // 控制子组件弹出框不显示
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
    // 文章不感兴趣删除
    handleDislikeSuccess () {
      const index = this.articleList.findIndex(item => item.art_id.toString() === this.nowArticleID)
      this.articleList.splice(index, 1)
    },
    // 展示更多操作的弹框
    displayDialog (artID) {
      this.showDialog = true // 显示弹出框
      this.nowArticleID = artID
    },
    // 文章列表
    async getArticleList () {
      const res = await apilArticleList({
        channel_id: this.channelID,
        timestamp: this.ts
      })
      //   console.log(res)
      //   this.articleList = res.results
      return res
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
    async onLoad () {
      // 应用延迟器
      await this.$sleep(800)
      const articles = await this.getArticleList()
      // console.log(articles)
      if (articles.results.length > 0) {
        // 追加
        this.articleList.push(...articles.results)
        // 更新时间戳
        this.ts = articles.pre_timestamp
      } else {
        this.finished = true
      }
      // 加载状态结束
      this.loading = false
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

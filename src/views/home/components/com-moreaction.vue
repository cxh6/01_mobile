<template>
  <!-- 弹出框 -->
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    close-on-click-overlay
    :show-confirm-button="false"
    @close="isOneLevel=true"
  >
    <van-cell-group v-if="isOneLevel">
      <van-cell icon="location-o" title="不感兴趣" @click="articleDislike()" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isOneLevel=false" />
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isOneLevel=true" />
      <van-cell v-for="item in reportsList" :key="item.value" :title="item.title" icon="location-o" @click="articleReport(item.value)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
// 导入api
import { apiArticleDislike, apiArticleReport } from '@/api/article.js'
export default {
  name: 'com-moreaction',
  props: {
    // 接收父组件传递过来的不感兴趣文章的id数据
    articleID: {
      type: String,
      required: true
    },
    // 接收父组件传递过来的数据
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 举报类型：
      reportsList: [
        { title: '其他问题', value: 0 },
        { title: '标题夸张', value: 1 },
        { title: '低俗色情', value: 2 },
        { title: '错别字多', value: 3 },
        { title: '旧闻重复', value: 4 },
        { title: '广告软文', value: 5 },
        { title: '内容不实', value: 6 },
        { title: '涉嫌违法犯罪', value: 7 },
        { title: '侵权', value: 8 }
      ],
      isOneLevel: true // 判断展示一级 或 二级 反垃圾内容 true:一级  false:二级
    }
  },
  methods: {
    // 文章举报
    async  articleReport (type) {
      try {
        await apiArticleReport({ articleID: this.articleID, type })
        // console.log(res)
      } catch (err) {
        if (err.response.status === 409) {
          return this.$toast.success('该文章已被举报过了！')
        } else {
          return this.$toast.success('该文章举报失败！')
        }
      }
      // 提示信息
      this.$toast.success('举报成功！')
      // 弹出框消失
      this.$emit('input', false)
    },
    // 不感兴趣文章操作
    async articleDislike () {
      await apiArticleDislike(this.articleID)
      // console.log(res)
      // 成功提示
      this.$toast.success('处理成功！')
      // 弹出框消失
      this.$emit('input', false)
      // 调用自己的dislikeSuccess事件，完成文章删除操作
      this.$emit('dislikeSuccess')
    }
  }
}
</script>

<style lang="less" scoped>
</style>

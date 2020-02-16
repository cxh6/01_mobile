<template>
  <!-- 弹出框 -->
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    close-on-click-overlay
    :show-confirm-button="false"
  >
    <van-cell-group v-if="isOneLevel">
      <van-cell icon="location-o" title="不感兴趣" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isOneLevel=false" />
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isOneLevel=true" />
      <van-cell title="其他问题" icon="location-o" />
      <van-cell title="标题夸张" icon="location-o" />
      <van-cell title="低俗色情" icon="location-o" />
      <van-cell title="错别字多" icon="location-o" />
      <van-cell title="旧闻重复" icon="location-o" />
      <van-cell title="广告软文" icon="location-o" />
      <van-cell title="内容不实" icon="location-o" />
      <van-cell title="涉嫌违法犯罪" icon="location-o" />
      <van-cell title="侵权" icon="location-o" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
export default {
  name: 'com-moreaction',
  props: {
    // 接收父组件传递过来的数据
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOneLevel: true // 判断展示一级 或 二级 反垃圾内容 true:一级  false:二级
    }
  }
}
</script>

<style lang="less" scoped>
</style>

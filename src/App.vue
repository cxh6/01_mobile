<template>
  <div id="app">
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <p class="a"></p>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
.a {
  width: 375px;
  height: 50px;
  background-color: #ccc;
}
</style>

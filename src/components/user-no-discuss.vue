<template>
  <div class="null-wrap">
      <image :src="me ?'https://s.kcimg.cn/test/trucknew/images/my-trends.png':'https://s.kcimg.cn/test/trucknew/images/null.png'" class="no-login-bg"></image>
      <div v-if="me"><text class="login-text">暂无动态</text></div>
      <div v-if="me"><text class="login-text">快去分享新鲜事吧～</text></div>
      <div v-if="!me"><text class="login-text">这个人很懒，还没有动态哦～</text></div>
  </div>
</template>

<style scoped>
    .null-wrap{flex-direction: column;align-items: center;}
    .no-login-bg{
      width: 400px;
      height: 280px;
      margin-top: 100px;
    }
    .login-text{
      font-size: 28px;
      color: #999;
      text-align: center;
    }
</style>

<script>
  export default {
    props:["me"],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

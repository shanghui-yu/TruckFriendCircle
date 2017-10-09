<template>
  <div class="state-wrap">
    <image class="state-img" src="https://s.kcimg.cn/test/trucknew/images/no-serach.png"></image>
    <text class="state-msg">{{text}}</text>
  </div>
</template>

<style scoped>
    .state-wrap{justify-content: center;align-items: center;}
    .state-img{
      text-align: center;
      margin-top:140px;
      width: 400px;height: 300px;
    }
    .state-msg{
      font-size: 28px;
      color: #999999;
      text-align: center;
    }
</style>

<script>
  export default {
    props: ['text'],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

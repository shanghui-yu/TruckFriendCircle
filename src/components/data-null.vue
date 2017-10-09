<template>
  <div class="null-wrap">
      <image src="https://s.kcimg.cn/test/trucknew/images/data-null.png" class="no-login-bg"></image>
      <div><text class="login-text">{{text}}</text></div>
  </div>
</template>

<style scoped>
    .null-wrap{flex-direction: column;align-items: center;}
    .no-login-bg{
      width: 400px;
      height: 300px;
      margin-top: 140px;
    }
    .login-text{
      font-size: 28px;
      color: #999;
      text-align: center;
    }
</style>

<script>
  export default {
    props:["source"],
    data () {
      return {
        text:''
      }
    },
    created(){
      if (this.source=="2") {
          this.text="还没有粉丝，赶快去发动态集粉吧！"
      }
      if (this.source=="3") {
          this.text="还没有关注过卡友，赶快去关注卡友吧"
      }
    },
    methods: {
    }
  }
</script>

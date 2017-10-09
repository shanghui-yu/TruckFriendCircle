<template>
  <div class="wrapper">
      <text class="loading">正在加载中...</text>
  </div>
</template>

<style scoped>
    .wrapper{position: fixed;top:0;right: 0;left: 0;bottom: 0;align-items: center;justify-content: center;}
    .loading{font-size: 32px;}
</style>
<script>
  export default {
    created(){
       this.clientHeight=weex.config.deviceHeight;
    },
    data () {
      return {
        clientHeight:'0'
      }
    },
    methods: {
    }
  }
</script>

<template>
  <div class="news-wrap">
  <!-- <div class="news-wrap" @click="jump(`/Detail/${news.aid}`)"> -->
      <div class="header">
        <image :src="news.avatar" class="user-avater"></image>
        <div style="flex:1"><text>{{news.username}}</text></div>
        <div><text>{{news.uptime}}</text></div>
      </div>
      <div class="comment-text">
        <text class="text">{{news.content}}</text>
      </div>
      <div class="comment">
        <div v-if="news.type=='zan'"><text class="zan">&#xe6d0;</text></div>
        <div class="content">
          <text>{{news.logContent}}</text>
        </div>
      </div>
      <div class="line"></div>
  </div>
</template>

<style scoped>
  .news-wrap{padding-left: 30px;padding-top: 30px;position: relative;padding-right: 30px;padding-bottom: 30px;}
  .header{flex-direction: row;align-items: center;margin-bottom: 15px;}
  .user-avater{width: 60px;height: 60px;
    border-top-left-radius:30px;
    border-top-right-radius:30px;
    border-bottom-left-radius:30px;
    border-bottom-right-radius:30px;
    margin-right: 20px;}
  .comment{flex-direction: row;align-items: center;margin-top: 15px;}
  .zan{color:#f86b4f; font-family: iconfont;width: 60px;height: 60px;font-size: 28px;line-height: 60px;margin-right: 20px;text-align: center;}
  .content{flex:1;background-color: #F3F3F3;padding-top: 20px;padding-left: 20px;padding-bottom: 20px;padding-right: 20px;}
  .text{line-height: 42px;font-size: 32px;}
  .line{position: absolute;bottom: 0;height: 1px;right: 0;left: 30px;background-color: #e5e5e5;}
</style>

<script>
  export default {
    props:["news"],
    data () {
      return {
      }
    },
    created(){
    },
    methods: {
    }
  }
</script>

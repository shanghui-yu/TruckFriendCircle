<template>
  <!-- <div class="discuss-wrap" @click="jump(`/DiscussDetail/${discuss.aid}`)"> -->
  <div class="discuss-wrap" @click="skip(`DiscussDetail.weex.js?aid=${discuss.aid}`)">
    <div class="discuss-list">
        <image :src="!discuss.img ? 'https://i.kcimg.cn/data/avatar/noavatar_small.gif':discuss.img" class="discuss-avatar" resize="cover" placeholder="https://s.kcimg.cn/test/trucknew/images/avater.png"></image>
        <div class="discuss-centent">
          <text class="discuss-title">{{discuss.title}}</text>
          <text class="discuss-describe">{{discuss.content}}</text>
        </div>
    </div>
  </div>
</template>

<style scoped>
.discuss-wrap{
  padding-left: 30px;
  background-color: #fff;
}
.discuss-list{
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 30px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #f5f5f5;
}
.discuss-title{
  font-size: 28px;
  color: #333333;
  line-height: 44px;
}
.discuss-describe{
  font-size: 24px;
  color: #999999;
  margin-top: 4px;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  lines: 2;
}
.discuss-centent{
  flex:1;
}
.discuss-avatar{
  width: 100px;
  height: 100px;
  border-bottom-left-radius:10px;
  border-bottom-right-radius:10px;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  margin-right: 20px;
  margin-top: 4px;
}
</style>
<script>
  export default {
    props: ['discuss'],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

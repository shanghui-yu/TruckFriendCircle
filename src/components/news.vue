<template>
  <div class="news-wrap" v-if="information.news=='yes'">
      <div class="news-content" @click="skip(`MYNew.weex.js`)">
          <image :src="information.avatar" class="avater"></image>
          <text>{{information.num}}条新消息</text>
      </div>
  </div>
</template>

<style scoped>
.news-wrap{
  flex-direction: row;
  justify-content: center;
  height: 80px;
  background-color: #f7f9fa;
  margin-top: 24px;
  margin-bottom: 24px;
}
.avater{width: 60px;height: 60px;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;margin-right: 20px;}
.news-content{
  width: 280px;
  height: 80px;
  border-top-left-radius:200px;
  border-top-right-radius:200px;
  border-bottom-left-radius:200px;
  border-bottom-right-radius:200px;
  background-color: #fff;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

<script>
  export default {
    props: ['information']
  }
</script>

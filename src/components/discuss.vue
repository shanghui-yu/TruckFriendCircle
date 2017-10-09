<template>
  <div style="margin-bottom: 20px;">
      <div class="discuss-list" >
        <div class="discuss-title" v-for="(item,index) in discuss" @click="skip(`DiscussDetail.weex.js?aid=${item.aid}`)">
            <text class="discuss-text">{{item.title}}</text><text class="line" v-if="index!=1">/</text>
        </div>
        <div class="discuss-title" @click="skip(`topic.weex.js`)">
            <text class="discuss-more">更多热议</text>
          </div>
      </div>
  </div>
</template>

<style scoped>
.discuss-list{flex-direction:row;padding-left:30px;padding-right:30px;position:relative;background-color:#fff;flex-wrap:wrap;justify-content:space-between;}
.discuss-title{justify-content:center;align-items:center;position:relative;width:345px;height:80px;border-bottom-color:#e5e5e5;border-bottom-width:1px;border-bottom-style:solid;}
.line{position:absolute;right:0;top:0;font-size:32px;line-height:80px;height:80px;color:#D8D8D8;}
.discuss-text{font-size:32px;color:#666;font-weight:bold;}
.discuss-more{font-size:32px;font-weight:bold;color:#F86B4F}
</style>
<script>
  import mixins from '../mixins/index.js'
  Vue.mixin(mixins)
  export default {
   props: ['discuss']
  }
</script>
<template>
  <div v-if="share.source" @click="toUrl(share.sourceUrl,share.sourceTitle)">
    <div class="video-share">
        <image :src="share.sourceImg" class="share-video-pic" resize="cover" @load="onload"></image> 
        <div class="share-text-wrap">
           <text class="share-video-text">{{share.sourceTitle}}</text>
        </div>
    </div>
  </div>
</template>
<style scoped>
.video-share{
  flex-direction:row;
  background-color: #F7F7F7;
  margin-top: 24px;
  margin-bottom: 24px;
  justify-content:center;
  align-items: center;
}
.share-video-pic{
  width: 110px;
  height: 110px;
}
.share-text-wrap{
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
}
.share-video-text{
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  lines: 2;
  font-size: 28px;
}
</style>
<script>
  const modal = weex.requireModule('modal')
  export default {
    props:{
      share:{
        type:Object,
        required:true
      }
    },
    data () {
      return {
      }
    },
    methods: {
      onload(e){
        // modal.alert({message: this.share.source})
        if (!e.success) {
          if (this.share.source=="forward_bbs") {
            this.share.sourceImg="https://s.kcimg.cn/test/trucknew/images/bbs.png"
          }else if (this.share.source=="forward_news") {
            this.share.sourceImg="https://s.kcimg.cn/test/trucknew/images/article.png"
          }
        }
      },
      toUrl(url,title){
          weex.requireModule('THAW').goUrl(url,title);
      }
    }
  }
</script>

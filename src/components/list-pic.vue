<template>
    <div class="pic-wrap" v-if="show">
        <image :src="item" :class="[index==2||index==5||index==8 ? 'pic-wrap-list' : 'pic-wrap-pic']" v-for="(item, index) in picWrap.img" resize="cover" @click="showImg(index,picWrap.img)" v-if="!twin" placeholder="https://s.kcimg.cn/test/trucknew/images/avater.png"></image>
        <image :src="item" :class="[index==1 ? 'pic-wrap-twin' : 'pic-wrap-pic']" v-for="(item, index) in picWrap.img" resize="cover" @click="showImg(index,picWrap.img)" v-if="twin" placeholder="https://s.kcimg.cn/test/trucknew/images/avater.png"></image>
    </div>
</template>
<style scoped>
.pic-wrap{
  flex-direction:row;
  display:flex;
  flex-wrap:wrap;
  /*justify-content:space-between;*/
  align-items:center;
  padding-bottom: 14px;
}
.pic-wrap-pic{
  height: 224px;
  width: 224px;
  margin-bottom: 10px;
  margin-right: 8px;
}
.pic-wrap-list{
  height: 224px;
  width: 224px;
  margin-bottom: 10px;
  margin-right: 0;
}
.pic-wrap-twin{
  height: 224px;
  width: 224px;
  margin-bottom: 10px;
  margin-right: 30px;
}
</style>
<script>
  const modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    props: ['picWrap'],
    data () {
      return {
        show:true,
        Right:8,
        twin:false
      }
    },
    created(){
      if (this.picWrap.img.length=="0") {
        this.show=false
      }
      if (this.picWrap.img.length=="4") {
        this.twin=true
      }
    },
    methods:{
      showImg(index,imgs){
         // var imgslist=imgs.join(',')
         var lookimages={index:index,imgs:imgs}
         storage.setItem('imgs',lookimages)
         this.skip(`LookImg.weex.js?index=${index}`)
      },
      showBigImg(index,imgs){
        weex.requireModule('THAW').onShowImages( { 
          "current": index,  
          "urls":imgs 
        });
      }
    }
  }
</script>

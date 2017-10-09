<template>
<div class="look-img-wrap" @click="close">
  <div class="header">
    <div class="close" @click="close"><text class="text back">&#xe6d6;</text></div>
    <div class="centent">
      <div><text class="text">{{index}}/</text></div>
      <div><text class="text">{{num}}</text></div>
    </div>
    <div class="down" @click="hold"><text class="text">保存</text></div>
  </div>
  <div class="wrapper">
       <slider class="slider" @change="change" :style='{height:imgheight}'>
        <div class="frame" v-for="img in imageList">
          <image class="image" resize="stretch" :src="img" @click="close" @load="onload" :style='{height:imgheight}'></image>
        </div>
      </slider>
  </div>
</div>
</template>

<style scoped>
  .look-img-wrap{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: #000;overflow-y: scroll;z-index: 10}
  .wrapper{flex: 1;justify-content: center;align-items: center;}
  .back{font-family: iconfont;}
  .header{height: 88px;justify-content: center;align-items: center;flex-direction: row;padding-right:30px;position: relative;z-index: 50;top:0;left: 0;right: 0;}
  .close{width: 88px;align-items: center;justify-content: center;height: 88px;}
  .text{color:#fff;font-size: 36px;}
  .centent{flex: 1;align-items: center;flex-direction: row;justify-content: center;}
  .down{height: 88px;align-items: center;justify-content: center;}
   .image {
    width: 750px;
  }
  .slider {
    width: 750px;
    overflow-y: scroll;
  }
  .frame {
    width: 750px;
    position: relative;
  }
</style>
<script>
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    data () {
      return {
        index:1,
        num:'',
        imageList:[],
        now:"",
        imgheight:'600px'
      }
    },
    created(){
      storage.getItem('imgs', event => {
          var res= JSON.parse(event.data) 
          this.imageList = res.imgs
          this.num=this.imageList.length
          // modal.alert({message: this.imageList})
        })
      this.now=weex.config.bundleUrl.match(/index=(\w+)/)[1]
    },
    methods: {
      change(event){
        // event.index=weex.config.bundleUrl.match(/index=(\w+)/)[1]
        // modal.alert({message: event})
        this.index =event.index+ 1
        // event.index= event.index+ 1
      },
      close(){
        navigator.pop({
            animated: "true"
          }, event => {
              console.log(1)
          })
      },
      onload(e){
        this.imgheight=Math.round((e.size.naturalWidth/750)*e.size.naturalHeight)+'px'
        // modal.alert({message: e.size.naturalWidth})
        // this.imgheight=e.size.naturalHeight+'px'
      },
      hold(){
         weex.requireModule('THAW').toimgHold(`${this.imageList[this.index]}`)  
         globalEvent.addEventListener('toimgHoldBack',function(data){
             modal.alert({message: "保存成功"})   
         })
      }
    }
  }
</script>

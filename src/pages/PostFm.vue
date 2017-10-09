<template>
  <div class="wrapper">
    <div class="header">
      <div class="post-btn" @click="back"><text class="header-text">取消</text></div>
      <div class="title"><text>发布动态</text></div>
      <div class="post-btn"><text class="header-text">发送</text></div>
    </div>
    <div class="content">
      <textarea class="textarea" placeholder="分享新鲜事..."  @change="onchange"></textarea>
      <!-- <div class="img-video">
        <image src="https://frontendsvn.360che.com/icon-project/wap/app/TruckFriendCircle/images/add-pic.png" class="img-btn"></image>
        <image src="https://frontendsvn.360che.com/icon-project/wap/app/TruckFriendCircle/images/add-video.png" class="video-btn"></image>
      </div> -->
      <div class="img-wrap">
          <div class="img-list">
            <image src="https://img7.kcimg.cn/friend/uploads/2017/04/17/20170417154053/27696.jpg" class="img"></image>
            <text class="cancel-text">&#xe6e5;</text>
          </div>
          <div class="img-list">
            <image src="https://img7.kcimg.cn/friend/uploads/2017/04/17/20170417154053/27696.jpg" class="img"></image>
          </div>
          <div class="img-list">
            <image src="https://img7.kcimg.cn/friend/uploads/2017/04/17/20170417154053/27696.jpg" class="img"></image>
          </div>
          <div class="fore-img">
            <image src="https://frontendsvn.360che.com/icon-project/wap/app/TruckFriendCircle/images/addpic.png" class="img"></image>
          </div>
      </div>
    </div>
    <div class='footer'>
       <div><text class="icon" style="color:#66D020">&#xe6e7;</text></div>
       <div class="address">
         <div style="margin-bottom:5px;"><text class="address-title">当前位置</text></div>
         <div><text class="address-text">紫檀大厦</text></div>
       </div>
       <div><text class="icon" style="color:#999">&#xe6e6;</text></div>
    </div>
  </div>
</template>

<script>
  const modal = weex.requireModule('modal')
  export default {
    data () {
      return {
        address: '',
        textarea:''
      }
    },
    created () {
    },
    methods: {
      onchange (e) {
        modal.toast({
          message: 'oninput',
          duration: 0.8
        })
      },
      back: function () {
        this.$router.back()
      },
    }
  }
</script>
<style scoped>
  .wrapper{background-color: #f7f9fa;}
  .header{height: 88px;flex-direction: row;justify-content: center;align-items: center;padding-left: 30px;padding-right: 30px;}
  .header-text{color: #1571E5;font-size: 36px;}
  .title{flex:1;justify-content: center;align-items: center;}

  .content{background-color: #fff;padding-left: 30px;padding-right: 30px;padding-top: 30px;padding-bottom: 30px;}
  .textarea{border:none;height: 150px;}
  .img-video{flex-direction: row;}
  .img-btn{width: 160px;height: 160px;margin-right: 30px;}
  .video-btn{width: 160px;height: 160px}
  .footer{flex-direction: row;padding-left: 30px;padding-right: 30px;justify-content: center;align-items: center;background-color: #fff;margin-top: 20px;height: 100px;}

  .img-wrap{flex-direction:row;display:flex;flex-wrap:wrap;align-items:center;padding-bottom: 14px;}
  .img-list{margin-right: 16px;padding-top: 10px;position: relative;}
  .img{border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top-left-radius:5px;border-top-right-radius:5px;width: 160px;height: 160px;}
  .fore-img{margin-bottom: 10px;position: relative;}
  .cancel-text{font-family: iconfont;position: absolute;right: 0px;top:0px;}
  .address{margin-left: 20px;flex: 1;}
  .address-title{font-size: 32px;color: #333}
  .address-text{font-size: 24px;color: #999;}
  .icon{font-family: iconfont;font-size: 34px;}
</style>

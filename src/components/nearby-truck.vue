<template>
    <div class="nearby-wrap">
        <div class="nearby-content">
             <div class="avatar-wrap">
              <image :src="truck.face" class="nearby-avatar" @click="skip(`user.weex.js?uid=${truck.bbsid}`)" placeholder="https://s.kcimg.cn/test/trucknew/images/avater.png"></image>
              <div v-if="truck.indentity.verified">
                  <image v-if="truck.indentity.color=='blue'" src="https://s.kcimg.cn/test/trucknew/images/blue-grade.png" class="addV"></image>
                  <image v-if="truck.indentity.color=='yellow'" src="https://s.kcimg.cn/test/trucknew/images/orange-grade.png" class="addV"></image>
              </div>
            </div>
            <div class="user-information">
                <text class="name">{{truck.name}}</text>
                <image class="grade" :src="'https://s.kcimg.cn/test/trucknew/images/greade'+truck.score.level+'.png'"></image>
                <div v-for="(item,index) in truck.medals">
                    <image v-if="item.medalid.toString().indexOf('29') > -1" class="rich" src="https://s.kcimg.cn/m/images/bbs/wechat/user/rich.png"></image>
                    <image v-if="item.medalid.toString().indexOf('30') > -1" class="first-rich" src="https://s.kcimg.cn/m/images/bbs/wechat/user/rich-first.png"></image>
                    <div class="old-driver" v-if="item.medalid.toString().indexOf('31') > -1">
                      <image :src="truck.face" class="old-driver-avatar"></image>
                      <image src="https://s.kcimg.cn/m/images/bbs/wechat/user/driver.png" class="old-driver-bg"></image>
                    </div>
                </div>
            </div>
            <text class="time">{{distance}}</text>
            <div class="phone-touch" @click="sendMessage(truck.bbsid)">
                  <text class="phone-touch-icon">&#xe6d8;</text><text style="font-size:28px;color: #1571E5;">手台</text>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .nearby-wrap{
      padding-left: 30px;
      padding-top: 30px;
      background-color: #fff;
    }
    .nearby-content{
      padding-right: 90px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: #f5f5f5;
      position: relative;
      height: 130px;
      flex-direction:row;
    }
    .avatar-wrap{
      width: 100px;
      height: 100px;
      margin-right: 20px;
      position: relative;
    }
    .nearby-avatar{
      width: 100px;
      height: 100px;
      border-top-left-radius:50px;
      border-top-right-radius:50px;
      border-bottom-left-radius:50px;
      border-bottom-right-radius:50px;
    }
    .addV{
      position: absolute;
      bottom: 0;
      right: 0;
      width: 24px;
      height: 24px;
    }
  .user-information{
    height: 48px;
    font-size: 32px;
    flex-direction:row;
    margin-top: 6px;
    flex: 1;
  }
  .name{
    color: #2062A9;
    line-height: 48px;
    font-size: 30px;
  }
  .grade{width:60px;height:30px;margin-top: 9px;margin-left: 10px;}
  .rich{
    width: 30px;
    height: 30px;
    margin-top: 9px;margin-left: 10px;
  }
  .first-rich{
    width: 36px;
    height: 30px;
    margin-top: 9px;margin-left: 10px;
  }
  .old-driver{
    width: 44px;
    height: 30px;
    margin-top: 9px;margin-left: 10px;
    position: relative;
  }
  .old-driver-avatar{
    width: 30px;
    height: 30px;
    border-top-left-radius:15px;
    border-top-right-radius:15px;
    border-bottom-left-radius:15px;
    border-bottom-right-radius:15px;
    position: absolute;left: 7px;
  }
  .old-driver-bg{
    position: absolute;
    z-index: 2;
    bottom: -4px;
    left:0;
    width: 44px;
    height: 12px;
  }
  .time{
    font-size: 24px;
    color: #999999;
    line-height: 24px;
    margin-top: 10px;
    position: absolute;
    left: 120px;
    bottom: 40px;
  }
  .phone-touch{
    position: absolute;
    right: 30px;
    flex-direction: row;
    align-items: center;
    top:30px;
  }
  .phone-touch-icon{
    font-family: iconfont;
    color: #1571E5;
    font-size: 44px;
  }
</style>
<script>
  export default {
    props:['truck'],
    data () {
      return {
        distance:''
      }
    },
    created(){
         var range =Math.ceil(this.truck.distance/100)
         if (range==0) {
            this.distance="100米以内"
         }
         if (range>0&&range<10) {
            this.distance=range+"00米以内"
         }else if(range >10 ){
            this.distance=parseInt(range/10)+"公里以内"
         }
    },
    methods: {
      sendMessage(uid){
        weex.requireModule('THAW').SendMessage(uid);
      }
    }
  }
</script>

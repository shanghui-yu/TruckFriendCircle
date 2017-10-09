<template>
  <div class="wraper">
      <div class="title-wrap">
        <div class="left" @click="back"><text class="text">&#xe6d6;</text> </div>
          <text class="title">意见反馈</text> 
        <div class="left" @click="post"><text class="text">发送</text> </div>
      </div>
      <div class="center">
        <textarea class="textarea" @input="oninput"  placeholder="请输入您的意见…"></textarea>
      </div>
  </div>
</template>

<style scoped>
    .wraper{background-color: #f7f9fa;}
    .title-wrap{flex-direction: row;justify-content: space-between;height: 88px;background-color: #f7f9fa;align-items: center;padding-left: 30px;padding-right: 30px;}
    .text{font-size: 36px;color: #1571E5;font-family: iconfont}
    .textarea{padding-left: 30px;padding-right: 30px;height: 400px;background-color: #fff;border:none;padding-top: 30px;padding-bottom: 30px;}
    .title{font-size: 36px;}
</style>

<script>
  import XHR from '../api'
  var modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')
  export default {
    data () {
      return {
        content:'',
        uid:''
      }
    },
    created(){
      this.uid=weex.config.bundleUrl.match(/uid=(\w+)/)[1]
    },
    methods: {
      post(){
        var _this=this;
        XHR.feedback({"versionNum":this.$route.params.version,"uid":this.uid,"content":this.content}).then( function (res) {
            if(res.data.status=="0"){
              modal.alert({
                  message: '提交成功',
                  duration: 0.3
                }, function (value) {
                  _this.back
                })
            }  
         })
      },
      oninput(e){
        this.content=e.value
      },
      back: function () {
        navigator.pop({
            animated: "true"
          }, event => {
              console.log(1)
          })
      }
    }
  }
</script>

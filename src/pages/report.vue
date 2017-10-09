<template>
  <div class="set-wrap">
  <div class="title-wrap"><text class="icon">&#xe6e8;</text><text class="title">系统设置</text></div>
      <div class="set-content">
        <div class="set-list" @click="selected(1)">
          <div style="flex:1"><text :class="[select==1 ?'textcolor':'text']">垃圾营销</text></div>
          <text class="right" v-if="select==1">&#xe6e0;</text>
        </div> 
        <div class="set-list" @click="selected(2)">
          <div style="flex:1"><text :class="[select==2 ?'textcolor':'text']">违法内容</text></div>
          <text class="right" v-if="select==2">&#xe6e0;</text>
        </div> 
        <div class="set-list" @click="selected(3)">
          <div style="flex:1"><text :class="[select==3 ?'textcolor':'text']">淫秽色情</text></div>
          <text class="right" v-if="select==3">&#xe6e0;</text>
        </div> 
        <div class="set-list" @click="selected(4)">
          <div style="flex:1"><text :class="[select==4 ?'textcolor':'text']">恶意攻击</text></div>
          <text class="right" v-if="select==4">&#xe6e0;</text>
        </div> 
        <div class="set-list" @click="selected(5)">
          <div style="flex:1"><text :class="[select==5 ?'textcolor':'text']">其他</text></div>
          <text class="right" v-if="select==5">&#xe6e0;</text>
        </div>  
      </div>
      <div class="submit" @click="tosubmit">
        <text :class="[submit ? 'submit-btn': 'disable']">提交</text>
      </div>
  </div>
</template>

<style scoped>
    .set-wrap{background-color: #f7f9fa;}
    .title-wrap{height: 90px;padding-left: 30px;flex-direction: row;align-items: center;}
    .title{color: #999;font-size: 32px;}
    .icon{font-family: iconfont;color: #F7411D;margin-right: 10px;}
    .set-content{padding-left: 30px;background-color: #fff;}
    .set-list{height: 88px;border-bottom-style: solid;border-bottom-width: 1px;border-bottom-color: #eee;padding-right: 30px;flex-direction: row;align-items: center;}
    .text{font-size: 32px;}
    .textcolor{font-size: 32px;color: #1571E5;}
    .right{font-family: iconfont;font-size: 30px;color: #1571E5;}
    .delete{color: #1571E5;font-size: 28px;}
    .submit{align-items: center;justify-content: center;margin-top: 100px;}
    .disable{font-size: 32px;color: #fff;width: 690px;height: 88px;background-color: #CAD6E6;text-align: center;line-height: 88px;border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom-left-radius:5px;
      border-bottom-right-radius:5px;}
    .submit-btn{font-size: 32px;color: #fff;width: 690px;height: 88px;background-color: #1571E5;text-align: center;line-height: 88px;border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom-left-radius:5px;
      border-bottom-right-radius:5px;}
</style>

<script>
  import XHR from '../api'
  export default {
    data () {
      return {
          select:0,
          submit:false
      }
    },
    methods: {
      selected(index){
        this.select=index
        this.submit=true
      },
      tosubmit(){
        if (this.submit) {
          var _this=this
           XHR.reportpost({aid:this.$route.params.aid}).then( function (res) {
              if (res.data.success) {
                  _this.$router.back()
              } 
            })
        }
      }
    }
  }
</script>

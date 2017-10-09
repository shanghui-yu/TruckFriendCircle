<template>
  <div class="set-wrap">
     <div><title :title="title"></title></div>
      <div class="title-wrap"><text class="title">系统设置</text></div>
      <div class="set-content">
        <!-- <div class="set-list">
          <div style="flex:1"><text class="text">图片缓存</text></div>
          <text class="delete">清除</text>
        </div>  --> 
        <div class="set-list" @click="skip(`feedback.weex.js?uid=${uid}&version=${version}`)">
          <div style="flex:1"><text class="text">意见反馈</text></div> 
          <text class="right">&#xe6e6;</text>
        </div>
        <div class="set-list" @click="skip('about.weex.js')">
          <div style="flex:1"><text class="text">关于我们</text></div>
          <text class="right">&#xe6e6;</text>
        </div> 
        <div class="set-list">
          <div style="flex:1"><text class="text">当前版本 {{version}}</text></div> 
        </div>
      </div>
      <div class="quit" @click="quit">
        <text class="quit-text">退出登录</text>
      </div>
  </div>
</template>

<style scoped>
    .set-wrap{background-color: #f7f9fa;}
    .title-wrap{justify-content: center; height: 60px;padding-left: 30px;}
    .title{color: #1571E5;font-size: 24px;}
    .set-content{padding-left: 30px;background-color: #fff;}
    .set-list{height: 88px;border-bottom-style: solid;border-bottom-width: 1px;border-bottom-color: #eee;padding-right: 30px;flex-direction: row;align-items: center;}
    .text{font-size: 32px;}
    .right{font-family: iconfont}
    .delete{color: #1571E5;font-size: 28px;}
    .quit{align-items: center;justify-content: center;margin-top: 60px;}
    .quit-text{font-size: 32px;color: #fff;width: 630px;height: 88px;background-color: #F7411C;text-align: center;line-height: 88px;}
</style>

<script>
  import Title from '../components/title.vue'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const globalEvent = weex.requireModule('globalEvent')
  const navigator = weex.requireModule('navigator')
  export default {
    components: {Title},
    data () {
      return {
        version:'1.0.1',
        uid:'0',
        title:'更多设置'
      }
    },
    created (e) {
       this.uid=weex.config.bundleUrl.match(/uid=(\w+)/)[1]
       storage.getItem('version', event => {
          this.version = event.data
       })
    },
    methods: {
      backs(){
        navigator.pop({
          animated: "true"
        }, event => {
            console.log(1)
        })
      },
      quit(){
        weex.requireModule('THAW').outlogin()
        var _this= this
        globalEvent.addEventListener('outloginBack',function(data){
          if (data.state=="success") {
            storage.setItem('uid','0')
            storage.setItem('avatar','')
            _this.back()
            _this.$store.dispatch('GET_HIS',{uid:`0`,avatar:''})
          }        
        })
      }
    }
  }
</script>

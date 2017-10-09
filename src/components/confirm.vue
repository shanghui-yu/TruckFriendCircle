<template>
<div class="confirm-wrap">
  <div class="confirm">
     <div class="title-wrap"><text class="title">是否取消关注？</text></div>
     <div class="content">
        <div class="cancel" @click="cancel"><text class="confirm-text">否</text></div>
        <div class="yes" @click="ok"><text class="confirm-text">是</text></div>
     </div>
  </div>
</div>
</template>

<style scoped>
    .confirm-wrap{justify-content: center;align-items: center;background-color: rgba(0,0,0,0.5);position: fixed;top:0;left: 0;bottom: 0;right: 0;z-index: 10}
    .confirm{width: 540px;height: 208px;background-color: #fff;border-radius: 5px;}
    .title-wrap{justify-content: center;align-items: center;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #4D4D4D;}
    .title{font-size: 34px;padding-top: 40px;padding-bottom: 40px;}
    .content{flex-direction: row;height: 88px;}
    .cancel{flex: 1;align-items: center;justify-content: center;border-right-width: 1px;border-right-style: solid;border-right-color: #4D4D4D;}
    .yes{flex: 1;align-items: center;justify-content: center;}
    .confirm-text{color: #0076FF;font-size: 34px;}
</style>

<script>
  import XHR from '../api'
  const modal = weex.requireModule('modal')
  export default {
    data () {
      return {
      }
    },
    computed: {
      Nowlog () {return this.$store.state.Nowlog}
    },
    methods: {
      ok(){
        var _this=this
        var aid=this.Nowlog.object.l_memberaid ? this.Nowlog.object.l_memberaid:this.Nowlog.object.aid
          XHR.cancelfollow({"aid":aid}).then(function(res){
            if (res.data.status=="1") {
              if (_this.Nowlog.index==undefined) {
                  _this.Nowlog.object.concern="no"
                  _this.$store.dispatch('confirm',false)
              }else{
                _this.$store.dispatch('confirm',false)
                _this.$store.dispatch('changeManage','')
                 _this.Nowlog.Array[_this.Nowlog.index].concern="no"
              }
            }
          })
      },
      cancel(){
        this.$store.dispatch('confirm',false)
      }
    },
    created(){
      console.log(this.Nowlog)
    }
  }
</script>

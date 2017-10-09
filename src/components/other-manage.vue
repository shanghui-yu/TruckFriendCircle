<template>
 <div class="wrapper" @click="cancel">
      <div class="management" ref="manage" >
        <div class="panel" @click="addfollow" v-if="Nowlog.object.concern=='no'">
            <text class="addfollow">加关注</text>
        </div>
        <div class="panel" @click="cancelfollow" v-if="Nowlog.object.concern=='yes'">
            <text class="canceltext">取消关注</text>
        </div>
        <div class="panel" @click="Report">
            <text class="managetext">举报</text>
        </div>
        <div class="panel cancel" @click="cancel">
            <text class="managetext">取消</text>
        </div>
      </div>
   </div>
</template>

<script>
  const animation = weex.requireModule('animation')
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  import XHR from '../api'
  
  export default {
    data () {
      return {
        confirm:{},
      }
    },
    computed: {
      Nowlog () {return this.$store.state.Nowlog}
    },
    methods: {
      move() {                         //上拉动画
        var manage = this.$refs.manage;
        animation.transition(manage, {
          styles: {
            transform: 'translate(0px, -310px)',
            transformOrigin: 'center center'
          },
          duration: 300, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        }, function () {
          console.log("执行完回掉")
        })
      },
      cancel(){
          var _this=this, manage = this.$refs.manage;
          animation.transition(manage, {
            styles: {
              transform: 'translate(0px, 0px)',
              transformOrigin: 'center center'
            },
            duration: 300, //ms
            timingFunction: 'ease',
            delay: 0 //ms
          }, function () {
            _this.$store.dispatch('changeManage','')
          })
      },
      addfollow(){
        var _this=this
        XHR.addfollow({"aid":this.Nowlog.object.l_memberaid}).then(function(res){
            if (res.data.status=="1") {
                _this.Nowlog.Array[_this.Nowlog.index].concern="yes"
                _this.cancel()
            }
        })
      },
      cancelfollow(){
          this.cancel()
          this.$store.dispatch('confirm',true)
          
      },
      Report(){
          this.$store.dispatch('changeManage','')
          this.skip(`report.weex.js?aid=${this.Nowlog.object.l_memberaid}`)
          // this.jump(`/Report/${this.Nowlog.object.aid}`) 
      },
    },
    mounted(){
      this.move()
    }
  }
</script>
<style scoped>
.wrapper{background-color: rgba(0,0,0,.5);position: fixed;left: 0;right: 0;top:0;bottom: 0;z-index: 10}
.management{position: absolute;bottom: -310px;flex: 1;left: 0;right: 0;}
.panel{height: 100px;background-color: #fff;border-bottom-style: solid;border-bottom-color: #e5e5e5;border-bottom-width: 1px;justify-content: center;align-items: center;}
.cancel{border-top-style: solid;border-top-color: #e5e5e5;border-top-width: 10px;}
.managetext{font-size: 36px;color: #666;}
.canceltext{font-size: 36px;color: #F86A4E;}
.addfollow{font-size: 36px;color: #1571e5;}
</style>


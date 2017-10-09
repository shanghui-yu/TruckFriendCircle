<template>
     <div class="mewrapper">
        <div class="management" ref="manage" >
          <div class="panel" @click="deletepost">
              <text class="managetext">删除</text>
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
              transform: 'translate(0px, -110px)',
              transformOrigin: 'center center'
            },
            duration: 300, //ms
            timingFunction: 'ease',
            delay: 0 //ms
          }, function () {
            _this.$store.dispatch('changeManage','')
          })
      },
      deletepost(){
          var json={
            type:"ajax",
            m:"dele",
            aid:this.Nowlog.object.aid
          }, _this=this;
          XHR.deletepost(json).then( function (res) {
            if (res.data.status=="1") {
                 _this.$store.dispatch('changeManage','')
                _this.Nowlog.Array.splice(_this.Nowlog.index,1)
            } 
          })
      }
    },
    mounted(){
      this.move()
    }
  }
</script>
<style scoped>
.mewrapper{background-color: rgba(0,0,0,.5);position: fixed;left: 0;right: 0;top:0;bottom: 0;z-index: 10}
.management{position: absolute;bottom: -310px;flex: 1;left: 0;right: 0;}
.panel{height: 100px;background-color: #fff;border-bottom-style: solid;border-bottom-color: #e5e5e5;border-bottom-width: 1px;justify-content: center;align-items: center;}
.cancel{border-top-style: solid;border-top-color: #e5e5e5;border-top-width: 10px;}
.managetext{font-size: 36px;color: #666;}
</style>


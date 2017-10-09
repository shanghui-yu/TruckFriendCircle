<template>
  <div class="list-footer">
      <div class="list-footer-flex" @click="setprise">
      <text class="icon" :style="{color:zanColor}">&#xe6d0;</text><text class="footer-text">{{footer.count_zan}}</text><text class="line">|</text>
      </div>
      <div class="list-footer-flex" @click="reply"><text class="icon prise">&#xe6ce;</text><text class="footer-text">{{footer.count_comment}}</text><text class="line">|</text></div>
      <div class="list-footer-flex" @click="toShare"><text class="icon share">&#xe6d1;</text><text class="footer-text">{{footer.count_share}}</text></div>
  </div>
</template>
<style scoped>
.list-footer{flex-direction:row;height:100px;box-shadow:inset 0 0 0 0 rgba(229,229,229,0.50);border-top-color:#E5E5E5;border-top-style:solid;border-top-width:1px;}
.list-footer-flex{flex:1;justify-content:center;align-items:center;flex-direction:row;position:relative;}
.line{color:#e5e5e5;position:absolute;right:0;top:38px;font-size:24px;}
.footer-text{font-size:28px;color:#999;}
.icon{font-family:iconfont;margin-right:10px;font-size:28px;}
.prise{color:#D4D7DD;}
.share{color:#D4D7DD;}
</style>
<script>
  import XHR from '../api'
  var navigator = weex.requireModule('navigator')
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  var globalEvent = weex.requireModule('globalEvent')
  export default {
    props:['footer','source'],
    created(){
        if (this.footer.count_zan=="0") {
          this.footer.count_zan="点赞"
        }
        if (this.footer.zan=="yes") {
          this.zanColor="#f86b4f"
        }else{
          this.zanColor="#D4D7DD"
        }
    },
    data () {
      return {
        zanColor:''
      }
    },
    methods: {
      setprise(){
        var _this=this;
        if (this.zanColor=='#f86b4f') {
          let json={};
              json.m="qxzan";
              json.aid=this.footer.aid
           XHR.cancelPrise(json).then( function (res) {
              _this.zanColor='#D4D7DD'
              _this.footer.count_zan--
            })
        }else{
          XHR.setPrise({"m":"zan","aid":this.footer.aid}).then( function (res) {
              _this.zanColor='#f86b4f'
              let t=parseInt(_this.footer.count_zan)
                    t = isNaN(t) ? 0 : t
                _this.footer.count_zan=t+1
          })
        }        
      },
      toShare(){
        // weex.requireModule('THAW').goShare(this.footer)
        var json = {
          "title" :this.footer.username,
          "content":this.footer.content,
          'imageUrl':''
        }
        if (this.footer.videoUrl=='') {
          json.shareType=1
          if (this.footer.img.length > 0) {
              json.imageUrl=this.footer.img[0]
          }
        }else{
          json.shareType=0
          json.imageUrl=this.footer.previewUrl
        }
        var _this = this
        XHR.toshare({id:this.footer.aid}).then( function (res) {
              json.shareUrl=res.data.url
              // modal.alert({message: json})
              weex.requireModule('THAW').goShare(json,_this.source)
              globalEvent.addEventListener('onGoToshareBack',function(data){
                if (data.status=="0") {
                  XHR.toshareOK({"logid":_this.footer.aid,"platform":data.platform}).then( function(dh) {
                    _this.footer.count_share= parseInt(_this.footer.count_share)+1
                  })
                }
              })
              
          })
        
      },
      reply(){
        if (this.source=='detail') {
          console.log(1)
        }else{
          this.skip(`detail.weex.js?aid=${this.footer.aid}`)
        }
      }
    },
  }
</script>

<template>
      <list class="top-list" v-if="top.length>0">
        <cell class="top-cell" v-for="(item, index) in top" @click="skip(`detail.weex.js?aid=${item.aid}`)">
          <div class="top-panel">
            <text class="to-top">置顶</text> 
            <text class="text">{{item.title}}</text>
          </div>
        </cell>
      </list>
</template>

<style scoped>
.top-list{padding-left:30px;padding-right:30px;padding-top:12px;padding-bottom:12px;background-color:#fff;margin-bottom:20px;}
.top-panel{justify-content:center;padding-top:12px;padding-bottom:12px;flex-direction:row;height:60px;}
.to-top{background-color:#FF9C37;font-size:24px;color:#fff;width:60px;height:36px;text-align:center;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  border-bottom-left-radius:5px;
  border-bottom-right-radius:5px;
  margin-right:20px;}
.extend{background:#1571E5;}
.text{font-size:32px;font-weight:bold;flex:1;line-height: 60px;line-height: 32px;lines: 1;}
</style>
<script>
  export default {
    props: {
      top: {
        type: Array,
        required: true,
      }
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

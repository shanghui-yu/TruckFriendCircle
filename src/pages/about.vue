<template>
<div class="wrapper">
  <div><title :title="title"></title></div>
  <scroller class="about-wrap" show-scrollbar="false">
      <text class="title">关于我们</text> 
      <text class="section">卡车之家，2009年6月1日上线，是目前中国最大的卡车门户网站以及中国最大的商用车互动服务平台。凭借“以用户为中心，以产品为导向，建立厂商、经销商、卡车用户之间的桥梁”的先进互联网理念，依托数据、资讯、互动三大平台，创造了中国商用车媒体的奇迹。目前日均访问量500多万，全球网站排名远超其它商用车网站，并已在北京、成都、沈阳、哈尔滨、包头、上海、广州成立办事处。</text>
      <text class="section">运营遵旨：用户为中心，产品为导向。</text>
      <text class="section">社会使命：建立厂商、经销商、用户之间的桥梁。</text>
      <text class="section">卡车之家网站产品库各项数据均为行业第一，截至2015年8月，已收录车型18147种，是目前最全的卡车车型库，用户买车必查；收录卡车实拍图片36万张，是目前最完整的卡车图片库，用户买车必看；论坛有效注册用户40万人，是目前最火的卡车论坛，用户互动必参与；注册经销商超过2万家，是目前最大的卡车购买咨询平台，用户购车必询。</text>
      <text class="section">卡车之家用户群当中，按照用户属性划分，车主占比最大，其中：卡车车主占比59%，职业司机21%，物流公司人员、零部件经销商、卡车爱好者、维修服务人员、零部件厂商及其它人员占20%。按照用户地域划分，排名前10的省份为：广东、山东、河北、江苏、河南、浙江、辽宁、广西、四川、湖北，与中国目前各省份经济、物流发展状况相吻合。</text>
      <text class="section">卡车之家竭诚为卡车厂商、经销商提供一个展示自己的舞台。</text>
      <text class="section">卡车之家始终为卡车车主、卡车司机提供平台将他们的用车感受与广大的卡车人交流。</text>
      <text class="section">卡车之家不断的为越来越多的卡车司机解决车辆在使用中遇到的问题。</text>
  </scroller>
</div>
</template>

<style scoped>
    .wrapper{flex: 1}
    .about-wrap{padding-left: 30px;padding-right: 30px;}
    .title{padding-top: 30px;padding-bottom: 30px;font-size: 32px;line-height: 44px;}
    .section{font-size: 32px;margin-bottom: 40px;line-height: 48px;}
</style>

<script>
  import Title from '../components/title.vue'
  export default {
    components: {Title},
    data () {
      return {
        title:'关于'
      }
    },
    created (){
    },
    methods: {
    }
  }
</script>

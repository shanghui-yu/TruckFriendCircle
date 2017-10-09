import fetch from './ajax'
// const HTTP_DEV = 'http://k.dev.360che.com'  // 开发
const HTTP_PRO = 'http://qa.k.360che.com'   // 预发布
// const HTTPS = 'https://k.360che.com'        // 正式
const HTTPS = 'https://k.360che.com'

const DEBUG = false                         // 是否开发模式

const URLS = DEBUG ? HTTP_PRO : HTTPS

class XHR {
// 获取用户信息
  getHis (json) {
    return fetch({
              url: `${URLS}/f/his.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }

  // 热门列表数据
  getHotList (json) {
    return fetch({
              url: `${URLS}/f/hotindex.php`,
              body: json,
              type: 'POST'
           })
  }
  // 全部最新
  getAllNew (json) {
    return fetch({
              url: `${URLS}/f/newindex.php`,
              body: json,
              type: 'POST'
           })
  }
  // 全部视频
  getAllVideo (json) {
    return fetch({
              url: `${URLS}/f/videoindex.php`,
              body: json,
              type: 'POST'
           })
  }
  // 全部关注
  getAllFollow (json) {
    return fetch({
              url: `${URLS}/f/concern.php`,
              body: json,
              type: 'POST'
           })
  }
  // 附近动态
  getNearTrends (json) {
    return fetch({
              url: `${URLS}/f/nearbylbs.php`,
              body: json,
              type: 'GET'
           })
  }
  // 附近卡友
  getNearTruck (json) {
    return fetch({
              url: `https://bbs-api.360che.com/interface/app/index.php?action=baidu&method=nearby`,
              body: json,
              type: 'GET'
           })
  }
   // 集赞达人
  SetLike (json) {
    return fetch({
              url: `${URLS}/f/Setlike.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
   // 人气王子
  buzz (json) {
    return fetch({
              url: `${URLS}/f/Popularity.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
   // 动态狂魔
  dynamic (json) {
    return fetch({
              url: `${URLS}/f/dynamic.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
    // 动态狂魔
  search (json) {
    return fetch({
              url: `${URLS}/f/service/search.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
   // 获取单个话题详情
  detail (json) {
    return fetch({
              url: `${URLS}/f/comment.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
  // 获取单个话题点赞人数
  Getprise (json) {
    return fetch({
              url: `${URLS}/f/zanlist.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
  // 获取全部热议话题
  GetAllTopic (json) {
    return fetch({
              url: `${URLS}/f/topiclist.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
   // 获取粉丝列表
  fans (json) {
    return fetch({
              url: `${URLS}/f/fans.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
    // 获取关注列表
  Conpeople (json) {
    return fetch({
              url: `${URLS}/f/Conpeople.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
    // 点赞
  setPrise (json) {
    return fetch({
              url: `${URLS}/f/loglist.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
  
     // 取消点赞
  cancelPrise (json) {
    return fetch({
              url: `${URLS}/f/loglist.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
     // 新消息具体提示信息
  News (json) {
    return fetch({
              url: `${URLS}/f/myMessage.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
     // 获取单个热议详情
  discussDetail (json) {
    return fetch({
              url: `${URLS}/f/singlehot.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
    // 加关注
  addfollow (json) {
    return fetch({
              url: `${URLS}/f/loglist.php?type=ajax&m=addconcern`,
              body: json,
              type: 'GET'
           })
  }
    // 取消关注
  cancelfollow (json) {
    return fetch({
              url: `${URLS}/f/loglist.php?type=ajax&m=deleteconcern`,
              body: json,
              type: 'GET'
           })
  }
  // 回复
  answer (json) {
    return fetch({
              url: `${URLS}/f/review.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
  // 删除回复
  deleteanswer (json) {
    return fetch({
              url: `${URLS}/f/loglist.php?type=ajax&m=deleComment`,
              body: json,
              type: 'GET'
           })
  }
   // 意见反馈
  feedback (json) {
    return fetch({
              url: `https://bbs-api.360che.com/interface/app/index.php?action=FeedBack&ismobile=1`,
              body: json,
              type: 'GET'
           })
  }
   // 是否是管理员
  admin (json) {
    return fetch({
              url: `${URLS}/f/api/isadmin.php`,
              body: json,
              type: 'GET'
           })
  }
   // 删除帖子
  deletepost (json) {
    return fetch({
              url: `${URLS}/f/loglist.php`,
              body: json,
              type: 'POST'
           })
  }
  // 管理员删除帖子
  admindeletepost (json) {
    return fetch({
              url: `${URLS}/f/service/manage.php`,
              body: json,
              type: 'POST'
           })
  }
   // 举报
  reportpost (json) {
    return fetch({
              url: `${URLS}/f/service/report.php`,
              body: json,
              type: 'POST'
           })
  }
   // 自嗨
  mehi (json) {
    return fetch({
              url: `${URLS}/f/service/manage.php`,
              body: json,
              type: 'POST'
           })
  }
   // 不推荐
  Norecommend (json) {
    return fetch({
              url: `${URLS}/f/service/manage.php`,
              body: json,
              type: 'POST'
           })
  }
   // 禁言
  Gag (json) {
    return fetch({
              url: `${URLS}/f/service/manage.php`,
              body: json,
              type: 'POST'
           })
  }
   // 设置热门
  setHot (json) {
    return fetch({
              url: `${URLS}/f/service/sethot.php`,
              body: json,
              type: 'POST'
           })
  }
  // 设置死鬼
  setDevil (json) {
    return fetch({
              url: `${URLS}/f/service/manage.php`,
              body: json,
              type: 'POST'
           })
  }
     // 点赞
  setPrise (json) {
    return fetch({
              url: `${URLS}/f/loglist.php?type=ajax`,
              body: json,
              type: 'GET'
           })
  }
     // 分享回掉
  toshareOK (json) {
    return fetch({
              url: `${URLS}/f/loglist.php?m=share`,
              body: json,
              type: 'POST'
           })
  }
    // 分享地址
  toshare (json) {
    return fetch({
              url: `${URLS}/f/api/getShareUrl.php`,
              body: json,
              type: 'GET'
           })
  }
}

export default new XHR()

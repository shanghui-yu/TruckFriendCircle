import * as types from './type'

export default {
    [types.GET_HIS] (state, messages) {
        state.user = messages
    },
    [types.TAB_ALL] (state, messages) {
        state.tabAll = messages.nb
    },
    [types.ALL_NAV] (state, messages) {
        state.allNav = messages
    },
    [types.TAB_NEA] (state, messages) {
        state.neaNav = messages
    },
    [types.IS_CK] (state, messages) {
        state.DATA = messages
    },
    [types.GET_HOT] (state, messages) {
        state.hotTab.DATA = messages.data.log             // 获取热门列表
        state.hotTab.discuss = messages.data.topic
        state.hotTab.stick = messages.data.top
        state.hotTab.nextpagetoken = messages.data.nextpagetoken
        state.hotTab.myMessage = messages.data.myMessage
        
    },
    [types.GET_ALL_NEW] (state, messages) {            
        state.newTab.DATA = messages.data.log             // 获取全部最新列表
        state.newTab.user = messages.data.user
        state.newTab.startid=messages.data.startid
    },
    [types.GET_ALL_VIDEO] (state, messages) {
        state.vidTab.DATA = messages.data.log           // 获取全部视频列表
        state.vidTab.nextpagetoken = messages.data.nextpagetoken
    },
    [types.GET_ALL_FOLLOW] (state, messages) {
        state.folTab.DATA = messages.data.log       // 获取全部关注列表
    },
    [types.GET_NEAR_TRENDS] (state, messages) {
        state.actTab.DATA = messages.data.data          // 获取附近动态列表
    },
    [types.GET_NEAR_TRUCK] (state, messages) {
        var res=messages.data;
        state.felTab.DATA = res.data.contents       // 获取附近卡友列表
    },
    [types.SET_LIKE] (state, messages) {
        state.setLike.DATA = messages.data.zan
        state.setLike.topThree = messages.data.zan.slice(0,3)
    },
    [types.BUZZ] (state, messages) {
        state.buzz.DATA = messages.data.fans
        state.buzz.topThree = messages.data.fans.slice(0,3)
    },
    [types.DYNAMIC] (state, messages) {
        state.dynamic.DATA = messages.data.log
        state.dynamic.topThree = messages.data.log.slice(0,3)
    },
    [types.changeManage](state, messages){
        state.changeManage=messages
    },
    [types.Nowlog](state, messages){
        state.Nowlog=messages
    },
    [types.confirm](state, messages){
        state.confirm=messages
    },
    [types.DETAILAID](state, messages){
        state.DETAILAID=messages
    },
    [types.PEOPLEDATA](state, messages){
        state.peopleData=messages
    },
    [types.GOTOBACK](state, json){
        if (json.type=="hot") {
            state.hotTab.top=json.top
        }
        if (json.type=="video") {
            state.vidTab.top=json.top
        }
        if (json.type=="new") {
            state.newTab.top=json.top
        }
        if (json.type=="near-truck") {
            state.felTab.top=json.top
        }
        if (json.type=="near-dongtai") {
            state.actTab.top=json.top
        }
        if (json.type=="follow") {
            state.folTab.top=json.top
        }
    },
}




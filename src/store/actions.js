import XHR from '../api/'
import * as types from './type'
const modal = weex.requireModule('modal')
// 热门－全部－附近－状态
export const TAB_ALL = ({ commit }, nb) => {
    // XHR.isCK().then( function (res) {
         commit(types.TAB_ALL, {nb})
    // })
}
// 最新－视频－关注－状态
export const ALL_NAV = ({ commit }, nb) => {
    commit(types.ALL_NAV, nb)
}
// 动态－卡友－状态
export const TAB_NEA = ({ commit }, nb) => {
    commit(types.TAB_NEA, nb)
}
// 测试
export const IS_CK = ({ commit }) => {
    XHR.isCK().then( function (res) {
        commit(types.IS_CK, res)
    })
}

// 用户信息
export const GET_HIS = ({ commit },object) => {
    commit(types.GET_HIS, object)
}

// 得到详情页aid
export const DETAILAID = ({ commit },o) => {
    commit(types.DETAILAID, o)
}

// 热门
export const GET_HOT = ({ commit },json) => {
    XHR.getHotList(json).then( function (res) {
        commit(types.GET_HOT, res)
    })
}
// 全部-最新
export const GET_ALL_NEW = ({ commit },json) => {
    XHR.getAllNew(json).then( function (res) {
        commit(types.GET_ALL_NEW, res)
    })
}
// 全部-视频
export const GET_ALL_VIDEO = ({ commit },json) => {
    XHR.getAllVideo(json).then( function (res) {
        commit(types.GET_ALL_VIDEO, res)
    })
}
// 全部-关注
export const GET_ALL_FOLLOW = ({ commit },json) => {
    XHR.getAllFollow(json).then( function (res) {
        commit(types.GET_ALL_FOLLOW, res)
    })
}

// 附近-动态
export const GET_NEAR_TRENDS = ({ commit },json) => {
    XHR.getNearTrends(json).then( function (res) {
        commit(types.GET_NEAR_TRENDS, res)
    })
}
// 附近-卡友
export const GET_NEAR_TRUCK = ({ commit },json) => {
    XHR.getNearTruck(json).then( function (res) {
        commit(types.GET_NEAR_TRUCK, res)
    })
}

// 集赞达人
export const SET_LIKE = ({ commit }) => {
    XHR.SetLike().then( function (res) {
        commit(types.SET_LIKE, res)
    })
}
// 人气王子
export const BUZZ = ({ commit }) => {
    XHR.buzz().then( function (res) {
        commit(types.BUZZ, res)
    })
}
// 动态狂魔
export const DYNAMIC = ({ commit }) => {
    XHR.dynamic().then( function (res) {
        commit(types.DYNAMIC, res)
    })
}

// 修改管理权限
export const changeManage = ({ commit },manage) => {
    commit(types.changeManage, manage)
}
// 当前帖子
export const Nowlog = ({ commit },manage) => {
    commit(types.Nowlog, manage)
}

// 修改管理权限
export const confirm = ({ commit },manage) => {
    commit(types.confirm, manage)
}
// 储存点赞粉丝列表
export const PEOPLEDATA = ({ commit },manage) => {
    commit(types.PEOPLEDATA, manage)
}
// 储存热门滚动位置
export const GOTOBACK = ({ commit },top) => {
    commit(types.GOTOBACK, top)
}

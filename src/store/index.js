// import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    user:{
        uid:'0',
        avater:''
    },
    tabAll: 1,
    allNav: 1,
    neaNav: 1,
    changeManage:'',
    confirm:false,
    Nowlog:{},
    detailAid:'',
    hotTab: {
        top: 0,
        DATA:[],
        discuss:[],
        stick:[],
        nextpagetoken:'',
        myMessage:{}
    },
    newTab: {
        top: 0,
        DATA:[],
        user:{},
        startid:''
    },
    vidTab: {
        top: 0,
        DATA:[],
        nextpagetoken:''
    },
    folTab: {
        top: 0,
        DATA:[]
    },
    actTab: {
        top: 0,
        DATA:[]
    },
    felTab: {
        top: 0,
        DATA:[]
    },
    setLike:{
        DATA:[],
        topThree:[]
    },
    buzz:{
        DATA:[],
        topThree:[]
    },
    dynamic:{
        DATA:[],
        topThree:[]
    },
    peopleData:[]
  }
})

export default store

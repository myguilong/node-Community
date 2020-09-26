import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageData:{},
    nowRouter:'',
    userCount:''
  },
  mutations: {
    setPageData(state,data){
      Object.entries(data).forEach((key,value)=>{
        state.pageData[key[0]]=key[1]
      })
    },
    setNowRouter(state,data){
      state.nowRouter = data
    },
    deletePageData(state,data){
       //删除缓存的数据
       delete state.pageData[data]
    },
    setUserCount(state,data){
      state.userCount = data
    }
  },
  actions: {
  },
  modules: {
    user
  },
  getters:{
    nameInfo:(state)=>(name)=>{
      return state.pageData[name]
  },
  }
})

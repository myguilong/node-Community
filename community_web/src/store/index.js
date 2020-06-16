import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
     userData:{}
  },
  mutations: {
    setUserData(state,data){
       state.userData = data
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getId(state){
      return state.userData._id
    },
  }
})

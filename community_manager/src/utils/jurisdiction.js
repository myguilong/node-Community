import Vue from 'vue'
import store from '../store'
 const has = Vue.directive('has',{
     //当被绑定的元素插入DOM中时...
     inserted:function (el,binding,vnode) {
         let roles  = ''
         //获取指令权限
         let characteristic = binding.value
         if(characteristic) roles = characteristic
         if(!Vue.prototype.$_has(roles)){
             el.parentNode.removeChild(el)
         }
     }
 })
Vue.prototype.$_has = function (value) {
  let isExist = false;
  const hasRoles = store.getters.roles && store.getters.roles.length > 0;
  if(!hasRoles){
      return false;
  }
    let res = value.filter(x => {
        return store.getters.roles.includes(x)
    })
    if(res.length>0) isExist = true
    return  isExist
}
export {has}

export const getCategoryList=(_this)=>{
    return request(_this.host+'/category/list','get')
}
export const getFoodsList=(_this)=>{
    return request(_this.host+'/foods/list','get')
}
function request(url,method,data){
   return new Promise((reslove,reject)=>{
    window.axios({
        method,
        url:url,
        data
      }).then(res=>{
        reslove(res)
      }).catch(err=>{
        reject(err)
      })
   })
}
// export {getCategoryList}
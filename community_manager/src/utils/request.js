const host = `http://localhost:8089`
export const getCategoryList=(_this)=>{
    return request(`${host}/category/list`,'get')
}
export const getFoodsList=(_this)=>{
    return request(`${host}/foods/list`,'get')
}
export const sign = (data)=>{
    return request(`${host}/login/signIn`,'post',data)
}
export const permission = () =>{
    return request(`${host}/login/permission`,'get')
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

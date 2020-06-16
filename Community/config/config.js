module.exports={
    redis:{
        //配置redis
        get host(){
            return '127.0.0.1'
        },
        get port(){
            return 6379
            //连接redis
        }
    },
    smtp:{
        get host(){
            return 'smtp.qq.com'
        },
        get user(){
            return '1360747193@qq.com'
        },
        get pass(){
            return 'bmpkikmtmuyiggcg'
        },
        get code(){
            //生成验证码
            return ()=>{
                return Math.random().toString(16).slice(2,6).toUpperCase()
            }
        },
        get expire(){
            //验证码时间
            return ()=>{
                return new Date().getTime()+60*1000
            }
        }
    }
}
//配置连接数据库
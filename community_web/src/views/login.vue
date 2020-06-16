<template>
  <div class="jq22-container">
    <div class="login-wrap">
      <div class="login-html">
        <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
        <label for="tab-1" class="tab">登录</label>
        <input id="tab-2" type="radio" name="tab" class="sign-up" />
        <label for="tab-2" class="tab">注册</label>
        <div class="login-form">
          <div class="sign-in-htm">
            <div class="group">
              <label for="user"  class="label">邮箱账号</label>
              <input type="text" v-model="mail"  class="input" />
            </div>
            <div class="group">
              <label for="pass" class="label">密码</label>
              <input type="password" v-model="passWord"  class="input"/>
            </div>
            <div class="group">
              <input id="check" type="checkbox" class="check" checked />
              <label for="check">
                <span class="icon"></span>保持登录状态
              </label>
            </div>
            <div class="group">
              <input type="submit" class="button" value="登录" @click="singin" />
            </div>
          </div>
          <div class="sign-up-htm">
            <div class="group">
              <label for="pass" class="label">头像</label>
              <van-uploader :after-read="afterRead" v-model="imgFile" :max-count="1" deletable />
            </div>
            <div class="group">
              <label for="pass" class="label">名称:</label>
              <label>
                <input  type="text" v-model="name" class="input" />
              </label>
            </div>
            <div class="group">
              <label for="user" class="label">邮箱账号:</label>
              <input  type="text" v-model="mail" class="input" />
            </div>
            <div class="group">
              <label for="pass" class="label">密码:</label>
              <input  type="password" v-model="passWord" class="input"  />
            </div>
            <div class="group">
              <label for="pass" class="label">确认密码:</label>
              <input  type="password" v-model="aginPassWord" class="input"  />
            </div>
            <div class="group">
              <input type="submit" class="button" value="注册" @click="registWebUser"/>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
        imgFile:[],
        File:null,
        mail:'',
        name:'',
        passWord:'',
        aginPassWord:''
    };
  },
  mounted() {},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.File = file.file
    },
    async singin(){
        if(this.mail==''){
             this.$notify('未输入邮箱')
            return false
        }
        if(this.passWord==''){
          this.$notify('未输入密码')
          return false
        }
           let result = await this.axios.post(`/webUser/login`,{
                mail:this.mail,
                password:this.passWord
            })
            const {data:{data:resData}} = result
            //将返回的token自动保存
            localStorage.setItem('web_userData',resData)
            //需要调用一次获取的信息接口
            let userInfo = await  this.axios.get('/webUser/userInfo')
            const {data:{data:infoData}} = userInfo
            this.$store.commit('setUserData',infoData.user)
            this.$router.push({
                path:"/index"
            })
    },
    async registWebUser(){
        if(this.mail==''){
            this.$notify('未输入邮箱')
            return false
        }
        if(this.name==''){
            this.$notify('未输入名称')
            return false
        }
        if(this.passWord==''){
            this.$notify('未输入密码')
            return false
        }
        if(this.aginPassWord==''){
            this.$notify('未输入确认密码')
            return false
        }
        if(this.aginPassWord!==this.passWord){
            this.$notify('密码和确认密码不相同')
            return false
        }
        let data = new FormData()
        data.append('userHead',this.File)
        data.append('password',this.passWord)
        data.append('name',this.name)
        data.append('mail',this.mail)
        let res = await this.axios.post(`${this.host}/webUser/register`,data,{ headers:{  'content-type': 'application/x-www-form-urlencoded'}})
        const {data:{code}} = res
        if(code==0){
            this.$notify({ type: 'success', message: '注册成功自动登录' })
            let result = await this.axios.post(`${this.host}/webUser/login`,{
                mail:this.mail,
                password:this.passWord
            })
            const {data:{data:resData}} = result
            //将返回的token自动保存
            localStorage.setItem('web_userData',resData)
            this.$router.push({
                path:"/index"
            })

        }else{
            this.$notify('注册失败')
            return false
        }
    }
  }
};
</script>

<style scoped >
  body{
    margin:0;
    color:#6a6f8c;
    background:#c8c8c8;
    font:600 16px/18px 'Open Sans',sans-serif;
  }
  *,:after,:before{box-sizing:border-box}
  .clearfix:after,.clearfix:before{content:'';display:table}
  .clearfix:after{clear:both;display:block}
  a{color:inherit;text-decoration:none;}
  input, button {
    outline: none;
    border: none;
  }
  .login-wrap{
    width:100%;
    margin:auto;
    max-width:525px;
    min-height:680px;
    position:relative;
    background:url(../../public/bg.jpg) no-repeat center;
    box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
  }
  .login-html{
    width:100%;
    height:100%;
    position:absolute;
    padding:90px 70px 50px 70px;
    background:rgba(40,57,101,.9);
  }
  .login-html .sign-in-htm,
  .login-html .sign-up-htm{
    top:0;
    left:0;
    right:0;
    bottom:0;
    position:absolute;
    -webkit-transform:rotateY(180deg);
    transform:rotateY(180deg);
    -webkit-backface-visibility:hidden;
    backface-visibility:hidden;
    -webkit-transition:all .4s linear;
    transition:all .4s linear;
  }
  .login-html .sign-in,
  .login-html .sign-up,
  .login-form .group .check{
    display:none;
  }
  .login-html .tab,
  .login-form .group .label,
  .login-form .group .button{
    text-transform:uppercase;
  }
  .login-html .tab{
    font-size:22px;
    margin-right:15px;
    padding-bottom:5px;
    margin:0 15px 10px 0;
    display:inline-block;
    border-bottom:2px solid transparent;
  }
  .login-html .sign-in:checked + .tab,
  .login-html .sign-up:checked + .tab{
    color:#fff;
    border-color:#1161ee;
  }
  .login-form{
    min-height:345px;
    position:relative;
    -webkit-perspective:1000px;
    perspective:1000px;
    -webkit-transform-style:preserve-3d;
    transform-style:preserve-3d;
  }
  .login-form .group{
    margin-bottom:15px;
  }
  .login-form .group .label,
  .login-form .group .input,
  .login-form .group .button{
    width:100%;
    color:#fff;
    display:block;
  }
  .login-form .group .input,
  .login-form .group .button{
    border:none;
    padding:5px 10px;
    font-size: 15px;
    border-radius:25px;
    background:rgba(255,255,255,.1);
  }
  .login-form .group input[data-type="password"]{
    text-security:circle;
    -webkit-text-security:circle;
  }
  .login-form .group .label{
    color:#aaa;
    font-size:12px;
  }
  .login-form .group .button{
    background:#1161ee;
  }
  .login-form .group label .icon{
    width:15px;
    height:15px;
    border-radius:2px;
    position:relative;
    display:inline-block;
    background:rgba(255,255,255,.1);
  }
  .login-form .group label .icon:before,
  .login-form .group label .icon:after{
    content:'';
    width:10px;
    height:2px;
    background:#fff;
    position:absolute;
    -webkit-transition:all .2s ease-in-out 0s;
    transition:all .2s ease-in-out 0s;
  }
  .login-form .group label .icon:before{
    left:3px;
    width:5px;
    bottom:6px;
    -webkit-transform:scale(0) rotate(0);
    -ms-transform:scale(0) rotate(0);
    transform:scale(0) rotate(0);
  }
  .login-form .group label .icon:after{
    top:6px;
    right:0;
    -webkit-transform:scale(0) rotate(0);
    -ms-transform:scale(0) rotate(0);
    transform:scale(0) rotate(0);
  }
  .login-form .group .check:checked + label{
    color:#fff;
  }
  .login-form .group .check:checked + label .icon{
    background:#1161ee;
  }
  .login-form .group .check:checked + label .icon:before{
    -webkit-transform:scale(1) rotate(45deg);
    -ms-transform:scale(1) rotate(45deg);
    transform:scale(1) rotate(45deg);
  }
  .login-form .group .check:checked + label .icon:after{
    -webkit-transform:scale(1) rotate(-45deg);
    -ms-transform:scale(1) rotate(-45deg);
    transform:scale(1) rotate(-45deg);
  }
  .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
    -webkit-transform:rotate(0);
    -ms-transform:rotate(0);
    transform:rotate(0);
  }
  .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
    -webkit-transform:rotate(0);
    -ms-transform:rotate(0);
    transform:rotate(0);
  }

  .hr{
    height:2px;
    margin:60px 0 50px 0;
    background:rgba(255,255,255,.2);
  }
  .foot-lnk{
    text-align:center;
  }
</style>
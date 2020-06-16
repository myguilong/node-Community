<template>
    <div>
        <div class="img">
            <img alt="Vue logo" src="../assets/logo.png">
        </div>
        <div class="inputWrap">
            <div class="wrap" v-if="login">
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        登录
                    </p>
                    <div>
                        <Input prefix="ios-at" placeholder="邮箱账号" v-model="mail" style="width: auto"/>
                    </div>
                    <div>
                        <Input prefix="md-keypad" type="password" v-model="password" placeholder="密码"
                               style="width: auto"/>
                    </div>
                    <div class="buttonWrap">
                        <Button type="primary" size="large" @click="signIn">登录</Button>
                        <Button type="success" size="large" @click="toRegister">去注册</Button>
                    </div>
                </Card>
            </div>

            <div class="regiser" v-if="!login">
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        注册
                    </p>

                    <Row style="margin-top: 0">
                        <Col :span="5" >
                          <span style="line-height: 50px;">电子邮箱: </span>
                        </Col>
                        <Col :span="18">
                            <Input prefix="ios-at" placeholder="邮箱账号" v-model="mail" style="width: auto"/>
                        </Col>
                    </Row>
                    <Row style="margin-top: 0">
                        <Col :span="5">
                          <span style="line-height: 50px;"> 密码:</span>
                        </Col>
                        <Col :span="18">
                          <Input prefix="md-keypad" type="password" v-model="password" placeholder="密码"
                               style="width: auto"/>
                        </Col>
                    </Row>
                    <Row style="margin-top: 0">
                        <Col :span="5">
                            <span style="line-height: 50px;">  确认密码:</span>
                        </Col>
                        <Col :span="18">
                            <Input prefix="md-keypad" type="password" v-model="aginPassword" placeholder="确认密码"
                                   style="width: auto"/>
                        </Col>
                    </Row>
                    <Row style="margin-top: 0">
                        <Col :span="5">
                         <span style="line-height: 50px;"> 验证码:</span>
                        </Col>
                        <Col :span="8">
                           <Input prefix="ios-construct-outline" v-model="visCode" placeholder="验证码" style="width: auto"/>
                        </Col>
                        <Col :span="5">
                            <Button style="margin-top:10px;" type="primary" @click="sendCode">{{time==60?'发送验证码':`${time}秒后可发送`}}</Button>
                        </Col>
                    </Row>

                    <div class="buttonWrap">
                        <Button type="primary" size="large" @click="toSignIn">去登录</Button>
                        <Button type="success" size="large" @click="register">注册</Button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mail: '',
                password: '',
                login: true,
                aginPassword: "",
                visCode: "",
                time:60
            }
        },
        methods: {
          async sendCode(){
                if(this.time!=60) return false
                let email = this.mail;
                let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if(reg.test(email)){
                    let result = await  this.axios.post(`${this.host}/login/sendCode`,{mail:email})
                    const {data:{code,msg}} = result
                    if(code==0){
                      this.$Message.success(msg);
                      let timeId = setInterval(()=>{
                          this.time-=1
                          if(this.time==0) clearInterval(timeId)
                        },1000)
                    }else{
                        this.$Message.error(msg)
                    }
                }else{
                    this.$Message.error("邮箱格式不正确");
                }
            },
            async signIn() {
                if (this.mail == '') {
                    this.$Message.error('邮箱为必填')
                    return false
                }
                if (this.password == '') {
                    this.$Message.error('密码为必填')
                    return false
                }
                let data = {
                    mail: this.mail,
                    password: this.password
                }
                let res = await this.axios.post(`${this.host}/login/signIn`, data)
                const {data: result} = res
                if (result.code != 0) {
                    this.$Message.error(result.msg);
                } else {
                    localStorage.setItem('user_data', result.data)
                    this.$Message.success(result.msg);
                    this.$router.push({
                        path: '/main'
                    })
                }

            },
            toSignIn() {
                this.login = true
            },
           async register() {
              if(this.mail==''){
                  //邮箱未填写
                  this.$Message.error('邮箱未填写!')
                  return false
              }
              if(this.password==''){
                  //密码未填写
                  this.$mount.error('密码未填写')
                  return  false
              }
              if(this.aginPassword!=this.password){
                  //确认密码不正确
                  this.$Message.error('确认密码未填写')
                  return  false
              }
              if(this.visCode==''){
                  //验证码未填写
                  this.$Message.error('验证码未填写')
                  return  false
              }
              const data = {
                  mail:this.mail,
                  code:this.visCode,
                  password:this.password
              }
              let result = await this.axios.post(`${this.host}/login/register`,data)
               const {data:{code,msg}} = result
               if(code==0){
                   this.$Message.success('注册成功')
                   setTimeout(()=>{
                       this.login = true
                   },2300)
               }
            },
            toRegister() {
                this.login = false
            }
        },
        mounted() {

        }

    }
</script>
<style lang='less' scoped>
    .img {
        width: 100%;
        display: flex;
        justify-items: center;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
    }

    .inputWrap {
        width: 100%;
        display: flex;
        justify-items: center;
        align-items: center;
        justify-content: center;

        div {
            margin-top: 10px;
        }

        .buttonWrap {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
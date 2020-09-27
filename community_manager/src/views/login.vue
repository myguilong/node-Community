<template>
  <div>
    <section>
      <h1>Hello</h1>
      <h3>欢迎使用社区团购管理系统</h3>
      <div class="inputWrap">
          <div class="circular"></div>
        <div class="wrap" v-if="login">
          <Card style="width:420px;height:300px">
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>登录
            </p>
            <div>
              <Input
                prefix="ios-at"
                placeholder="邮箱账号"
                size="large"
                v-model="mail"
                style="width: auto;width:100%;"
              />
            </div>
            <div>
              <Input
                prefix="md-keypad"
                type="password"
                v-model="password"
                placeholder="密码"
                size="large"
                style="width: auto;width:100%;"
              />
            </div>
            <div class="buttonWrap">
              <Button type="primary" size="large" @click="signIn" style="
    width: 100px;">登录</Button>
              <Button type="success" size="large" @click="toRegister" style="
    width: 100px;">去注册</Button>
            </div>
          </Card>
        </div>
        <div class="regiser" v-if="!login">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>注册
            </p>

            <Row style="margin-top: 0">
              <Col :span="5">
                <span style="line-height: 50px;">电子邮箱:</span>
              </Col>
              <Col :span="18">
                <Input prefix="ios-at" size="large" placeholder="邮箱账号" v-model="mail" style="width: auto;width:100%;" />
              </Col>
            </Row>
            <Row style="margin-top: 0">
              <Col :span="5">
                <span style="line-height: 50px;">密码:</span>
              </Col>
              <Col :span="18">
                <Input
                  prefix="md-keypad"
                  type="password"
                  v-model="password"
                  placeholder="密码"
                  style="width: auto;width:100%;"
                  size="large"
                />
              </Col>
            </Row>
            <Row style="margin-top: 0">
              <Col :span="5">
                <span style="line-height: 50px;">确认密码:</span>
              </Col>
              <Col :span="18">
                <Input
                  prefix="md-keypad"
                  type="password"
                  v-model="aginPassword"
                  placeholder="确认密码"
                  style="width: auto;width:100%;"
                  size="large"
                />
              </Col>
            </Row>
            <Row style="margin-top: 0">
              <Col :span="5">
                <span style="line-height: 50px;">验证码:</span>
              </Col>
              <Col :span="8">
                <Input
                  prefix="ios-construct-outline"
                  v-model="visCode"
                  placeholder="验证码"
                  style="width: auto;width:100%;"
                  size="large"
                />
              </Col>
              <Col :span="5">
                <Button
                  style="margin-top:10px;"
                  type="primary"
                  @click="sendCode"
                   size="large"
                >{{time==60?'发送验证码':`${time}秒后可发送`}}</Button>
              </Col>
            </Row>

            <div class="buttonWrap">
              <Button type="primary" size="large" style="
    width: 100px;" @click="toSignIn">去登录</Button>
              <Button type="success" size="large" style="
    width: 100px;" @click="register">注册</Button>
            </div>
          </Card>
        </div>
        <img
          src="https://yys-fans.fp.ps.netease.com/file/5ed7050a8b7427127458627cUMmcLhSx02?fop=imageView/2/w/845/h/604"
          alt
        />
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mail: "",
      password: "",
      login: true,
      aginPassword: "",
      visCode: "",
      time: 60,
      imgIndex: 0
    };
  },
  methods: {
    async sendCode() {
      if (this.time != 60) return false;
      let email = this.mail;
      let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(email)) {
        let result = await this.axios.post(`${this.host}/login/sendCode`, {
          mail: email
        });
        const {
          data: { code, msg }
        } = result;
        if (code == 0) {
          this.$Message.success(msg);
          let timeId = setInterval(() => {
            this.time -= 1;
            if (this.time == 0) {
              this.time = 60;
              clearInterval(timeId);
            }
          }, 1000);
        } else {
          this.$Message.error(msg);
        }
      } else {
        this.$Message.error("邮箱格式不正确");
      }
    },
    async signIn() {

      if (this.mail == "") {
        this.$Message.error("邮箱为必填");
        return false;
      }
      if (this.password == "") {
        this.$Message.error("密码为必填");
        return false;
      }
      let data = {
        mail: this.mail,
        password: this.password
      };
      this.$store.dispatch('user/sign',{mail: this.mail, password: this.password}).then(()=>{
          this.$Message.success('登录成功');
          this.$router.push({
            path: "/main/categoryList"
          });
      }).catch(()=>{
        this.$Message.error('用户名或密码错误');
      })
    },
    toSignIn() {
      this.login = true;
    },
    async register() {
      if (this.mail == "") {
        //邮箱未填写
        this.$Message.error("邮箱未填写!");
        return false;
      }
      if (this.password == "") {
        //密码未填写
        this.$mount.error("密码未填写");
        return false;
      }
      if (this.aginPassword != this.password) {
        //确认密码不正确
        this.$Message.error("确认密码未填写");
        return false;
      }
      if (this.visCode == "") {
        //验证码未填写
        this.$Message.error("验证码未填写");
        return false;
      }
      const data = {
        mail: this.mail,
        code: this.visCode,
        password: this.password
      };
      let result = await this.axios.post(`${this.host}/login/register`, data);
      const {
        data: { code, msg }
      } = result;
      if (code == 0) {
        this.$Message.success("注册成功");
        setTimeout(() => {
          this.login = true;
        }, 2300);
      }
    },
    toRegister() {
      this.login = false;
    }
  },
  mounted() {},
  created() {
    //   this.initImg();
  }
};
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
section {
  width: 80%;
  box-shadow: gray 2px 2px 10px 1px;
  padding: 8px;
  margin: 80px auto;
  border-radius: 50px;
  h1,
  h3 {
    text-align: center;
  }

  img {
    width: 300px;
    margin-left: 8px;
  }
}
.circular{
    position: absolute;
    width: 200px;
    height: 200px;
    background: red;
    border-radius: 50%;
    box-shadow: gray 2px 2px 10px 1px;
    left: -100px;
    top:-100px;
}
.inputWrap {
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  div {
    margin-top: 10px;
  }

  .buttonWrap {
    display: flex;
    justify-content: space-between;
  }
}
</style>

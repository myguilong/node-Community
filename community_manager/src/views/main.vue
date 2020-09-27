<template>
  <div class="layout">
    <Layout>
      <Header>
        <div class="demo-avatar">
          <Row>
            <Col :span="4" style="color: white;">
<!--              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />-->
             当前用户 {{$store.state.user.userMail}}
            </Col>
            <Col :span="5">
              <Button type="error"> 注销</Button>
            </Col>
          </Row>
        </div>
      </Header>
      <Layout style="background:white;">
        <Sider hide-trigger>
          <Row>
            <Col span="8">
              <Menu :theme="theme2" accordion   :active-name="nowPath">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-paper" />商城管理
                  </template>
                  <MenuItem name="/main/categoryEdit" v-has="['admin','editor']"  to="/main/categoryEdit">添加分类</MenuItem>
                  <MenuItem name="/main/categoryList" to="/main/categoryList">分类管理</MenuItem>
                  <MenuItem name="/main/foodsEdit" v-has="['admin','editor']"  to="/main/foodsEdit">添加商品</MenuItem>
                  <MenuItem name="/main/foodsList" v-has="['admin','editor']"  to="/main/foodsList">商品编辑</MenuItem>
                  <MenuItem name="/main/foodsList" v-has="['admin','editor']"  to="/main/foodsList">热门栏目编辑</MenuItem>
                </Submenu>
                <Submenu v-has="['admin','editor']" name="2">
                  <template slot="title">
                    <Icon type="ios-people" />社区管理
                  </template>
                  <MenuItem name="/main/leaderManager" to="/main/leaderManager">团长管理</MenuItem>
                  <MenuItem name="/main/leaderApply" to="/main/leaderApply">团长申请列表</MenuItem>
                </Submenu>
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-stats" />统计分析
                  </template>
                  <MenuGroup title="今日订单">
                    <MenuItem name="3-1">今日订单</MenuItem>
                    <MenuItem name="3-2">今日金额流水</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                  </MenuGroup>
                  <MenuGroup title="社区订单">
                    <MenuItem name="3-4">各社区订单查看</MenuItem>
                    <MenuItem name="3-5"></MenuItem>
                  </MenuGroup>
                </Submenu>
                <Submenu name="7">
                  <template slot="title">
                    <Icon type="ios-stats" />专场
                  </template>
                  <MenuGroup title="设置">
                    <MenuItem v-has="['admin','editor']"  name="3-1">专场设置</MenuItem>
                    <MenuItem name="3-1">提现</MenuItem>
                  </MenuGroup>
                </Submenu>
                <Submenu name="8">
                  <template slot="title">
                    <Icon type="ios-stats" />设置
                  </template>
                  <MenuItem name="/main/userManagerList" v-has="['admin','editor']"  to="/main/userManagerList">系统用户列表</MenuItem>
                  <MenuItem name="/main/userList" v-has="['admin','editor']"  to="/main/userList">客户列表</MenuItem>
                </Submenu>
                <Submenu name="4">
                  <template slot="title">
                    <Icon type="ios-stats" />广告
                  </template>
                  <MenuGroup title="设置">
                    <MenuItem name="4-1">消息推送</MenuItem>
                    <MenuItem name="4-2" to="/main/adBanner">添加首页广告</MenuItem>
                    <MenuItem name="4-2" to="/main/adList">首页广告管理</MenuItem>
                  </MenuGroup>
                </Submenu>
                <Submenu name="5">
                  <template slot="title">
                    <Icon type="ios-stats" />财务
                  </template>
                  <MenuGroup title="设置">
                    <MenuItem name="3-1">佣金管理</MenuItem>
                    <MenuItem name="3-1">提现</MenuItem>
                  </MenuGroup>
                </Submenu>
              </Menu>
            </Col>
          </Row>
        </Sider>
        <Content>
          <div class="rightWrap">
            <div class="visTop">
              <Tag
                v-for="(item, index) in pageArr"
                type="border"
                checkable
                :key="index"
                :color="nowPath==item.fullPath?'success':''"
                closable
                @on-change="handleClick(index)"
                @on-close="handleClose(index)"
              >{{item.name}}</Tag>
            </div>
            <div class="routerView">
              <router-view></router-view>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      pageArr: this.$data
    };
  },
  data() {
    return {
      show: true,
      theme2: "light",
      nowPath: "",
      pageArr: []
    };
  },
  mounted() {
    //获取当前的路由，如果保存的信息没有当前路由在信息中生成当前路由
    if (this.$route.path != "/") {
      this.pageArr.push(this.$route);
      this.nowPath = this.$route.path;
    }
  },
  methods: {
    handleClose(index) {
      if (this.pageArr[index].path == this.nowPath) {
        this.$store.commit("deletePageData", this.pageArr[index].path);
        this.pageArr.splice(index, 1);
        if (this.pageArr.length > 0) {
          this.nowPath = this.pageArr[0].path;
          this.$router.push({ path: this.pageArr[0].path });
        } else {
          //返回主页
          this.$router.push({
            path: "/main"
          });
        }
      } else {
        // console.log(this.pageArr[index])
        let _index = 0;
        this.pageArr.map((item, aindex) => {
          if (item.path == this.pageArr[index].path) {
            _index = aindex;
          }
        });
        this.$store.commit("deletePageData", this.pageArr[_index].path);
        this.pageArr.splice(_index, 1);
      }
    },
    handleTabRemove() {},
    selectPath(e) {},
    handleClick(index) {
      this.nowPath = this.pageArr[index].path;
      this.$router.push({
        path: this.pageArr[index].path
      });
    }
  },
  watch: {
    $route(value) {
      console.log(value)
      let arr = this.pageArr.filter(item => item.name == value.name);
      if (arr.length != 0) {
        this.nowPath = value.path;
      } else {
        if (value.path != "/main") {
          this.pageArr.push(value);
          this.nowPath = value.path;
        }
      }
    }
  }
};
</script>
<style lang='less'>
.rightWrap {
  padding-left: 55px;
}
.ivu-layout-sider {
  transition: all 0.2s ease-in-out;
  position: relative;
  background: white;
  min-width: 0;
}
.visTop {
}
.routerView {
  padding-top: 20px;
}
</style>

<template>
  <div class="selectLeader">
    <van-nav-bar title="选择团长" />
    <div>
      <p class="now">当前位置</p>
      <div class="addressInfo">
        <div>{{nowAddress}}</div>
        <div>修改></div>
      </div>
    </div>
    <div class="item" v-for="(item, index) in nearLeaderList" :key="index">
      <van-row>
        <van-col span="6">
          <van-image round width="1rem" height="1rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-col>
        <van-col span="18">
          <div class="itemAddress">
            <div>
              <p>{{item.name}}</p>  
              <p>距您{{item.phone}}</p>
                 <van-button type="primary" size="mini">选TA</van-button>
            </div>
            <div>自提点:{{item.address}}</div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      nowAddress: "",
      nearLeaderList: []
    };
  },
  mounted() {
    let location = localStorage.getItem("location");
    let nowAddress = localStorage.getItem("address");
    let lng = location.split(",")[0];
    let lat = location.split(",")[1];
    this.nowAddress = nowAddress;
    this.getNearByLeader(lng, lat);
  },
  methods: {
    async getNearByLeader(lng, lat) {
      let longitude = lng;
      let latitude = lat;
      let res = await this.$axios.get("/leader/nearLeader", {
        params: {
          longitude,
          latitude
        }
      });
      const {
        data: { data }
      } = res;
      this.nearLeaderList = data;
    }
  },
  components: {},
  watch: {}
};
</script>

<style scoped lang="less">
.selectLeader {
  background: #f6f6f6;
  height: 100vh;
}
.now {
  font-size: 14px;
  text-align: left;
  text-indent: 20px;
  background: white;
}
.item {
  background: white;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  .itemAddress{
      text-align: left;
      div:nth-child(1){
          font-size: 15px;
          display: flex;
      }
      div:nth-child(2){
          font-size: 16px;
      }
  }
}
.addressInfo {
  width: 100%;
  display: flex;
  background: white;
  div:nth-child(1) {
    width: 80%;
    font-size: 18px;
    text-align: left;
    text-indent: 20px;
    font-weight: bold;
  }
  div:nth-child(2) {
    width: 20%;
    font-size: 12px;
    text-align: right;
    text-indent: 20px;
    line-height: 25px;
  }
}
</style>

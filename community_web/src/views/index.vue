<template>
  <div class="wrap">
    <van-nav-bar title="首页" />
    <van-row style="background: white;border-radius: 10px">
      <van-col span="5">
        <div class="imgWrap">
          <van-image round width="50px" height="50px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
      </van-col>
      <van-col span="12">
        <div class="headerInfo">
          <div>菜鸟小蓝(亚索)</div>
          <div>
            <van-icon name="location-o" />云山诗意
          </div>
        </div>
      </van-col>
      <van-col span="6">
        <div class="iconWrap">
          <div>
            <van-icon name="comment-circle-o" />
          </div>
          <div>分享</div>
        </div>
        <div class="iconWrap">
          <div>
            <van-icon name="manager-o" />
          </div>
          <div>附近团长</div>
        </div>
      </van-col>
    </van-row>
    <div class="mySwipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-row>
      <van-col span="6" class="todayTitle">今日团购</van-col>
      <van-col span="3" class="toendTitle">距结束</van-col>
      <van-col span class="time">03:20:19</van-col>
    </van-row>
    <div class="category">
      <van-grid :border="false" :column-num="5">
        <van-grid-item v-for="(item,index) in categoryList" :key="index">
          <van-image
            width="50px"
            height="50px"
            :src="host+'/uploads/category/'+item.categoryIcon"
            round
          />
          {{item.categoryName}}
        </van-grid-item>
      </van-grid>
    </div>
    <div class="zc">
      <van-row>
        <van-col span="12">
          <div class="firstZcTitle" style="text-align: left;text-indent:23px;">立顿专场</div>
          <div class="firstZcText" style="text-align: left;text-indent: 23px;">立顿专场</div>
          <div>
            <img
              class="zcImg"
              src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2168024451,1561408374&fm=26&gp=0.jpg"
              alt
            />
            <img
              class="zcImg"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587199512913&di=f38f0053d01b687059c5f0308f20e0df&imgtype=0&src=http%3A%2F%2Fimg11.360buyimg.com%2Fn1%2Fjfs%2Ft9367%2F345%2F754140818%2F534852%2F5db88505%2F59ae69e8Na8840ff2.jpg"
              alt
            />
          </div>
        </van-col>
        <van-col span="6">
          <div class="firstZcTitle">家乐专场</div>
          <div class="firstZcText">居家必备</div>
          <div>
            <img
              class="zcImg"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587199512913&di=f38f0053d01b687059c5f0308f20e0df&imgtype=0&src=http%3A%2F%2Fimg11.360buyimg.com%2Fn1%2Fjfs%2Ft9367%2F345%2F754140818%2F534852%2F5db88505%2F59ae69e8Na8840ff2.jpg"
              alt
            />
          </div>
        </van-col>
        <van-col span="6">
          <div class="firstZcTitle">家庭日</div>
          <div class="firstZcText">一起狂欢</div>
          <div>
            <img
              class="zcImg"
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1193429481,1501352377&fm=26&gp=0.jpg"
              alt
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <van-sticky>
      <van-tabs v-model="active" color="#AADD44" background="#F6F6F6" @click="handleSelectCategory">
        <van-tab v-for="(item, index) in isPopularCategory" :key="index">
          <template #title>{{item.categoryName}}</template>
        </van-tab>
      </van-tabs>
    </van-sticky>
    <div class="foodsItem">
      <div class="item" v-for="(item,index) in foodsList" :key="index">
        <van-row>
          <van-col span="10">
            <img :src="host+'/uploads/foodsDetail/'+item.foodsBanner[0]" alt />
          </van-col>
          <van-col span="14">
            <div
              class="foodsTitle"
            >{{item.foodsName}}&nbsp;&nbsp;&nbsp;{{parentData.foodsSpecifications}}</div>
            <div class="smlText">{{item.foodsText}}</div>
            <div class="sendTime">
              <div>送货时间</div>
              <div>{{item.foodsDelivery.split('-')[1]}}月{{item.foodsDelivery.split('-')[2]}}号</div>
            </div>
            <div>
              <van-row>
                <van-col :span="18">
                  <div class="money">
                    <div>
                      ￥
                      <p>{{item.foodsPrice}}</p>
                    </div>
                    <div>￥{{item.foodsOldPrice}}</div>
                  </div>
                </van-col>
                <van-col :span="6">
                  <button
                    class="addCarts"
                    v-if="!item.hasSpecification"
                    @click="addToCart(item._id)"
                  >+</button>
                  <button
                    class="selectSpec"
                    v-if="item.hasSpecification"
                    @click="selectSpec(item._id,item)"
                  >选规格</button>
                </van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>
        <van-row class="item_bottom">
          <van-col :span="12" style="text-align: left">累计销量6500</van-col>
          <van-col :span="12" style="text-align: right">已团764/剩余274</van-col>
        </van-row>
      </div>
    </div>
    <div v-if="foodsList.length===0">本期分类暂无商品</div>
    <!-- <van-popup v-model="specShow" style="{ height: '30%' }">
          <div class="pop">
            内容
            <img class="popImg" :src="specImg" alt />
          </div>
    </van-popup>-->
    <spec-show
      :specShow="showSpec"
      :specImg="specImg"
      :parentData="parentData"
      :specList="specList"
      @closePop="closePop"
    ></spec-show>
  </div>
</template>
<script>
import { Mixin } from "../mixins/setTop";
import specShow from "../components/specShow";

export default {
  name: "index",
  mixins: [Mixin],
  components: { specShow },
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      categoryList: [],
      foodsList: [],
      active: 0,
      specImg: "",
      specList: [], //规格列表
      selectSpecContent: 0,
      specNumber: 1,
      isPopularCategory: [],
      showSpec: false,
      parentData: {}
    };
  },
  mounted() {
    this.getCategoryList();
    this.getFoodsList();
    //读取自己的定位授权，因为需要https才能访问浏览器定位，所以这里从高德地图的组件中自己选择
    let location = localStorage.getItem("location");
    if (location) {
       let lng = location.split(',')[0];
       let lat = location.split(',')[1];
       let selectLeader = localStorage.getItem('selectLeader')
    //    this.getNearByLeader(lng,lat);
       if(selectLeader){
            console.log(selectLeader)
       }else{
          this.$router.push({
              path:'/selectLeader'
          })
       }

    } else {
      this.$dialog.alert({
        message: "由于定位功能需要在https下使用,请点击确定前往高德地图选择地址进行操作"
      }).then(()=>{
         this.$router.push({
            path:`/mapLocation?mode=select`
         })
      });
    }
  },
  methods: {
    async getCategoryList() {
      let result = await this.axios(`/category/list`);
      //分出热门推荐 和首页的分类
      const {
        data: { data }
      } = result;
      let isIndexArr = data.filter(item => item.showInIndex);
      let isPopularArr = data.filter(item => item.isPopular);
      this.categoryList = isIndexArr;
      this.isPopularCategory = isPopularArr;
    },
    async getFoodsList() {
      let result = await this.axios(`/foods/list`);
      const {
        data: { data }
      } = result;
      this.foodsList = data;
    },
    async addToCart(id) {
      //此id为商品的id
      const userData = this.$store.state.userData;

      if (userData._id) {
        //已经登录的用户
        let result = await this.axios.post("/cart/create", {
          userID: userData._id,
          foodsID: id
        });
        const { data } = result;
        this.$emit("setCart");
      } else {
        //未登录用户
        this.$notify({
          type: "success",
          message: "你未登录"
        });
      }
    },
    async selectSpec(id, item) {
      const res = await this.axios.get(`/foods/getSpec`, { params: { id } });
      const {
        data: {
          data: { specifArry }
        }
      } = res;
      this.specImg = `${this.host}/uploads/foodsDetail/${item.foodsBanner[0]}`;
      this.parentData = item;
      this.showSpec = true;
      let arr = specifArry.map(item => JSON.parse(item));
      this.specList = arr;
    },
    closePop() {
      this.showSpec = false;
    },
    async handleSelectCategory(index) {
      const { _id: id } = this.isPopularCategory[index];
      let result = await this.axios.get(`/foods/list?category=${id}`);
      const {
        data: { data }
      } = result;
      this.foodsList = data;
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  margin-top: 8px;
  padding-bottom: 50px;
  background: #f6f6f6;

  .imgWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    justifycategory-items: center;
  }

  .headerInfo {
    padding-top: 12px;

    div {
      font-size: 15px;
      text-align: left;
      line-height: 18px;
    }

    div:nth-child(2) {
      color: #86b156;
      font-size: 12px;
    }
  }

  .iconWrap {
    padding-top: 8px;
    float: left;
    margin-left: 8px;
    font-size: 17px;

    div:first-child {
      display: flex;
      justify-items: center;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    div:last-child {
      font-size: 10px;
    }
  }

  .mySwipe {
    img {
      width: 100%;
      height: 120px;
    }
  }

  .todayTitle {
    font-size: 18px;
    font-weight: bold;
  }

  .toendTitle {
    font-size: 13px;
    line-height: 30px;
  }

  .time {
    font-size: 14px;
    line-height: 30px;
  }

  .category {
    font-size: 12px;
    background: white;
    margin-bottom: 10px;
    border-radius: 12px;
    padding: 2px;
  }

  .zc {
    background: white;
    padding: 5px;
    border-radius: 12px;

    .firstZcTitle {
      font-size: 16px;
    }

    .firstZcText {
      font-size: 12px;
      color: #f76e1e;
    }

    .zcImg {
      width: 80px;
    }
  }

  .foodsItem {
    img:first-child {
      width: 90%;
      height: 110px;
      margin-left: 5%;
    }

    .foodsTitle {
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .smlText {
      font-size: 12px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #888888;
    }
  }
}

.foodsItem {
  .item {
    width: 96%;
    margin-left: 2%;
    border-radius: 8px;
    padding-top: 8px;
    background: white;
    margin-top: 8px;

    .sendTime {
      width: 120px;
      border: #fe6c55 solid 1px;
      display: flex;
      border-radius: 8px;
      margin-top: 12px;
      text-align: center;

      div:first-child {
        color: white;
        background: #fe6c55;
        border-radius: 8px;
        width: 60px;
        font-size: 8px;
        text-align: center;
      }

      div:last-child {
        text-align: center;
        width: 60px;
        font-size: 8px;
      }
    }

    .money {
      /*color: #F76E1E;*/
      text-align: left;

      div:first-child {
        color: #fc3a1f;
      }

      div:last-child {
        font-size: 13px;
        color: #b1b0af;
        text-decoration: line-through;
      }

      p {
        display: inline-block;
        font-size: 20px;
        color: #fc3a1f;
      }

      p:first-letter {
        font-size: 25px;
      }
    }

    .addCarts {
      background: #8dca3e;
      color: white;
      border: none;
      border-radius: 50%;
      width: 30px;
      text-align: center;
      line-height: 30px;
      height: 30px;
      font-size: 29px;
    }

    .selectSpec {
      background: #8dca3e;
      color: white;
      border: none;
      border-radius: 10%;
      font-size: 13px;
    }

    .item_bottom {
      font-size: 12px;
      color: #b1b0af;
      padding: 5px;
    }

    .spec {
    }
  }
}
</style>
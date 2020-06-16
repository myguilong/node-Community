<template>
  <div ref="categoy_item">
    <van-nav-bar
            title="分类"
    />
    <van-row>
      <van-col span="6">
        <div class="foods_item" ref="warp_scroll">
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item
              v-for="(item, index) in categoryList"
              :key="index"
              :title="item.categoryName"
              @click="changeCategory"
              ref="scroll_item"
            />
          </van-sidebar>
        </div>
      </van-col>
      <van-col span="18">
        <div class="foodslist_item">
          <div class="item" v-for="(item, index) in foodDetailList" :key="index" @click="toFoodsDetail(item._id)">
            <van-row>
              <van-col span="9">
                <img
                  :src="host+'/uploads/foodsDetail/'+item.foodsBanner[0]"
                  alt
                />
              </van-col>
              <van-col span="15">
                  <h5>{{item.foodsName}}</h5>
                  <span class="speciton">•500g/袋</span>
                <van-row>
                   <van-col span="10">
                    <p class="nowPrice">￥{{item.foodsPrice}}</p>
                  </van-col>
                   <van-col span="10">
                    <p class="oldPrice">￥{{item.foodsOldPrice}}</p>
                  </van-col>
                   <van-col span="4">
                     <button class="addBtn" @click.stop="addCart(item._id)">
                       +
                     </button>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </div>
          <div v-show="foodDetailList.length==0">
            本期暂无商品...
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Mixin } from "../mixins/setTop";
export default {
  name: "category",
  mixins: [Mixin],
  data() {
    return {
      categoryList: [],
      activeKey: 0,
      box: null,
      boxToTopHeight: "",
      foodDetailList: []
    };
  },
  mounted() {
    this.getCategory();
    this.box = this.$refs.warp_scroll;
    this.box.addEventListener("scroll", () => {
      this.boxToTopHeight = this.box.scrollTop;
    });
  },
  methods: {
    async addCart(id){
       //加入购物车
       console.log(id)
      //从vuex中拿信息
       console.log(this.$store.userData)
    },
    toFoodsDetail(id){
       console.log(id)
       this.$router.push({
         path:`/foodsDetail/${id}`
       })
    },
    async getCategory() {
      let result = await this.axios(`/category/list`);
      //分出热门推荐 和首页的分类
      const {
        data: { data }
      } = result;
      this.categoryList = data;
            this.getFoodsList();
    },
    async changeCategory(index) {
      let wrap = this.$refs.categoy_item;
      let item = wrap.getElementsByClassName("van-sidebar-item")[0];
      this.box.scrollTop = item.offsetHeight * (index > 0 ? index - 2 : 0);
      this.boxToTopHeight = item.offsetHeight * (index > 0 ? index - 2 : 0);
    },
    async getFoodsList(category){
      //获取所属分类商品
      let result = await this.axios.get(`/foods/list?category=${this.categoryList[0]._id}`)  
      //默认是第一个分类
      const {data:{data}} = result
      this.foodDetailList = data
    },
    async onChange(e){
      let result = await this.axios.get(`/foods/list?category=${this.categoryList[e]._id}`)  
      //默认是第一个分类
      const {data:{data}} = result
      this.foodDetailList = data
    }
  },
  activated() {
   
    this.box = this.$refs.warp_scroll;
    if (this.boxToTopHeight) {
      this.box.scrollTop = this.boxToTopHeight;
    }
    this.box.addEventListener("scroll", () => {
      this.boxToTopHeight = this.box.scrollTop;
    });
  },
  deactivated() {
    this.$refs.warp_scroll.removeEventListener("scroll", () => {});
  }
};
</script>
<style scoped lang="less">
.foods_item {
  overflow: auto;
  height: 90vh;
}
.foodslist_item {
  overflow: auto;
  height: 90vh;
  .item {
    padding: 8px;
    img {
      width: 100%;
    }
    h5 {
      text-align: left;
      text-indent: 15px;
      font-size: 20px;
    }
    .speciton{
       font-size: 16px;
       display: block;
       text-align: left;
       text-indent: 15px;
       color: #999999;
    }
    .nowPrice{
      font-size: 22px;
      color: red;
      text-indent: 10px;
    }
    
    .oldPrice{
      font-size:15px;
      color: #B5B5B5;
      line-height: 32px;
      text-indent:3px;
    }
    .addBtn{
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #9ED541;
      color: white;
      padding: 0;
      border: none;
      border-radius: 50%;
      float: right;
    }
  }
}
</style>
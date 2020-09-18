<template>
  <div>
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <div class="swipe">
      <van-swipe :autoplay="3000" style="height: 300px;">
        <van-swipe-item v-for="(item, index) in foodsDetail.foodsBanner" :key="index">
          <img :src="host+'/uploads/foodsDetail/'+item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-row>
      <van-col span="17">
        <div class="priceInfo">
          <div>
            ￥
            <span>{{foodsDetail.foodsPrice}}</span>
            <span>￥{{foodsDetail.foodsOldPrice}}</span>
          </div>
          <div>剩余{{foodsDetail.number}}份 | 已团{{foodsDetail.buyName}}份</div>
        </div>
      </van-col>
      <van-col span="7">
        <div class="wrap_endTime">
          <div class="endTime">
            <div>距离结束</div>
            <div>
              <ul>
                <li>03</li>:
                <li>06</li>:
                <li>02</li>
              </ul>
            </div>
          </div>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col :span="20">
        <h3 class="foods_title">{{foodsDetail.foodsName}} {{foodsDetail.foodsSpecifications}}</h3>
        <p class="foods_des">{{foodsDetail.foodsText}}</p>
      </van-col>
      <van-col :span="4">
        <van-icon name="ellipsis" color="#8ACE32" />
        <p class="feng_xiang">分享</p>
      </van-col>
    </van-row>
    <div class="hline"></div>
    <div class="speiton">
      <van-row style="padding:5px;">
        <van-col span="4">配送</van-col>
        <van-col span="20">{{foodsDetail.foodsDelivery}}</van-col>
      </van-row>
      <van-row style="margin-top:3px; padding:5px">
        <van-col span="4">已选</van-col>
        <van-col span="20">
          <div class="select_spection_wrap">
            <p>{{foodsDetail.foodsSpecifications}}</p>
            <p>
              <van-icon name="arrow" />
            </p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="hline"></div>
    <div class="detail_wrap">
      <h1>商品详情</h1>
      <div class="border">
        <van-row>
          <van-col span="5">
            <span class="span">产地</span>
          </van-col>
          <van-col span="19">
            <span class="span">{{foodsDetail.form}}</span>
          </van-col>
        </van-row>
      </div>
      <div class="detail_text">
        <p>{{foodsDetail.foodsInnerhtml}}</p>

        <img
          v-for="(item, index) in foodsDetail.foodsImgList"
          :key="index"
          :src="host+'/uploads/foodsDetail/'+item"
          alt
        />
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="首页" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "foodsDetail",
  data() {
    return {
      foodsDetail: {},
      foodsSpec: {}
    };
  },
  props: { id: {} },
  mounted() {
    console.log("mounted");
    this.getFoodsDetail();
  },
  methods: {
    onClickIcon() {
      Toast("点击图标");
    },
    async onClickButton() {
      Toast("点击按钮");
      //加入购物车
      console.log(this.foodsDetail)
      console.log(this.$store.state)
      // const result = await this.axios.post(`/carts/create`,{
          
      // })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    async getFoodsDetail() {
      //获取商品详细信息
      let result = await this.axios.get(`/foods/detail?id=${this.id}`);
      const {
        data: { data, spec }
      } = result;
      this.foodsDetail = data;
      if (spec != false) {
        this.foodsSpec = spec;
      }
    }
  }
};
</script>

<style scoped lang="less">
.swipe {
  img {
    height: 100%;
    width: 100%;
  }
}
.priceInfo {
  background: #8dd133;
  padding: 5px;
  font-size: 16px;
  color: white;
  height: 60px;
  text-align: left;
  text-indent: 20px;
  span:first-child {
    font-size: 29px;
  }
}
.wrap_endTime {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebfbe3;
  font-size: 16px;
  .endTime {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        text-align: center;
        display: flex;
        li {
          background: #6cbb15;
          color: white;
          border-radius: 3px;
          font-size: 13px;
          padding: 3px;
        }
      }
    }
  }
}
.foods_title {
  font-size: 19px;
  text-align: left;
  padding: 8px;
  padding-bottom: 0;
}
.foods_des {
  font-size: 14px;
  text-align: left;
  padding: 8px;
  padding-top: 0;
  color: #666666;
}
.feng_xiang {
  font-size: 15px;
}
.hline {
  background: #f4f4f4;
  height: 12px;
}
.speiton {
  text-align: left;
  font-size: 15px;
  text-indent: 13px;
}
.select_spection_wrap {
  display: flex;
  justify-content: space-between;
}
.detail_wrap {
  padding: 5px;
  h1 {
    font-size: 18px;
    text-align: left;
    line-height: 35px;
  }
  .border {
    border: 1px solid #f3f4f6;
    text-align: left;
    text-indent: 20px;
    .span {
      font-size: 15px;
      line-height: 50px;
    }
  }
  .detail_text {
    font-size: 16px;
    text-align: left;
    padding-bottom: 30px;
    img {
      width: 100%;
      display: block;
      /*第二种方法 个人赞同这一种，因为大部分图片和文字都是垂直居中的*/
      vertical-align:middle;
    }
    ul {
      li {
        img {
          width: 100%;
        }
      }
    }
  }
}
.set_wrap {
  width: 100%;

  height: 200px;
  position: fixed;
  bottom: 0;
}
</style>
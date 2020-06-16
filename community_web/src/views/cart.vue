<template>
  <div>
      <van-nav-bar title="购物车"/>
      <div>
          <cart-item @removeItem="removeItem($event)" v-for="item in cartList" :item="item" :key="item._id"/>
          <div class="cartSumbit">
              <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
                  <van-checkbox v-model="checked">全选</van-checkbox>
              </van-submit-bar>
          </div>
      </div>
  </div>
</template>

<script>
import cartItem from "../components/cartItem";
export default {
  name: "cart",
  data() {
    return {
        checked:true,
        cartList:[]
    };
  },
  components:{
      cartItem
  },
  mounted() {
      this.getCartList()
  },
  methods: {
      async removeItem(e){
          this.getCartList()
      },
      async onSubmit(){

      },
      async getCartList(){
          const {data:{data}} =await this.axios.get('/cart/list',{params:{ userID:this.$store.getters.getId }})
          this.cartList = data
      }
  }
};
</script>

<style  lang="less">
    .van-submit-bar {
        position: absolute;
        bottom: 50px;
        left: 0;
        z-index: 100;
        width: 100%;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        background-color: #fff;
        -webkit-user-select: none;
        user-select: none;
    }
</style>
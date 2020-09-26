<template>
  <div>
      <van-nav-bar title="购物车"/>
      <div>
          <cart-item ref="cartItem" @changeCheck="changeCheck" @removeItem="removeItem($event)" v-for="(item,index) in cartList" :item="item" :index="index" :key="item._id"/>
          <div class="cartSumbit">
              <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
                  <van-checkbox v-model="checked" @click="changeAllChecked">全选</van-checkbox>
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
        cartList:[],
        checkArr:[]
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
          console.log(this.checkArr)
          //勾选的是需要去生成订单的购物车item
          // this.axios.post('/order/carte')
      },
      async getCartList(){
          const {data:{data}} =await this.axios.get('/cart/list',{params:{ userID:this.$store.getters.getId }})
          this.cartList = data
          const checkArr = data.map((item,index)=>index)
          this.checkArr = checkArr
      },
      changeAllChecked(){
          let cartItem = this.$refs.cartItem
          if(this.checkArr.length==this.cartList.length){
              this.checkArr = []
              cartItem.map(item=>item.isCheck=false)
          }else{
              const checkArr = this.cartList.map((item,index)=>index)
              this.checkArr = checkArr
              cartItem.map(item=>item.isCheck=true)
          }
      },
      changeCheck(e){
          // this.checkArr[e] = !this.checkArr[e]
          if(this.checkArr.includes(e)){
              this.checkArr.splice(e,1)
              this.checked = false
          }else{
              this.checkArr.push(e)
              if(this.checkArr.length==this.cartList.length){
                  this.checked = true
              }
          }
      }
  },
  computed:{
     allPrice(){
             let price = null;
             if(this.checkArr.length!=0){
                 this.checkArr.map((item)=>{
                         price+=parseFloat(this.cartList[item].foods.foodsPrice)*this.cartList[item].number
                 })
                 return (price*100)
             }else{
                 return  0
             }
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
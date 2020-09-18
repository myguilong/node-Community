<template>
     <div class="cartItem" v-if="item.foods">
          <van-row>
              <van-col span="3">
                  <v-center>
                      <van-checkbox @click="changeNowCheck" v-model="isCheck" icon-size="24px"></van-checkbox>
                  </v-center>
              </van-col>
              <van-col span="5">
                  <v-center>
                     <img :src="host+'/uploads/foodsDetail/'+item.foods.foodsBanner[0]" alt=""/>
                  </v-center>
              </van-col>
              <van-col span="16">
                   <div>
                       <p class="shopName">{{item.foods.foodsName}} &nbsp;{{item.foods.foodsSpecifications}}</p>
                       <van-row>
                           <van-col span="5">
                              <span class="nowMoney">￥{{item.foods.foodsPrice}}</span>
                           </van-col>
                           <van-col span="5">
                              <span class="oldMoney">￥{{item.foods.foodsOldPrice}}</span>
                           </van-col>
                           <van-col span="14">
                               <v-center>
                                   <van-icon name="delete" @click="removeCartItem"/>
                                   <van-stepper v-model="value" theme="round" @plus="addCart"
                                         @minus="reduceCart"       button-size="22" disable-input/>
                               </v-center>
                           </van-col>
                       </van-row>
                   </div>
              </van-col>
          </van-row>
     </div>
</template>
<script>
    import VCenter from "../common/vCenter";
    export default {
        name: "cartItem",
        componentiis: {VCenter},
        props: {
            item: {},
            index:{
                type:Number
            }
        },
        data() {
            return {
                value: 0,
                isCheck:true
            }
        },
        mounted() {
            this.value = this.item.number
        },
        methods: {
            async addCart(e) {
                this.$toast({
                    type: 'loading',
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0, // 持续展示 toast
                });
                const foodsID = this.item.foods._id
                const userID = this.$store.state.userData._id
                const {data: {code, msg}} = await this.axios.post('/cart/create', {foodsID, userID})
                //请求增加购物车数量接口
                this.$toast.clear()
                this.$emit('removeItem','aaa')
            },
            async reduceCart(e){
                // //请求减少购物车数量接口
                this.$toast({
                    type:'loading',
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0, // 持续展示 toast
                });
                const foodsID = this.item.foods._id
                const userID = this.$store.state.userData._id
                let {data: {code, msg}} = await this.axios.post('/cart/reduce', {foodsID, userID})
                this.$toast.clear()
                this.$emit('removeItem','aaa')
            },
            async removeCartItem(){
                 const cartfoodsid = this.item._id
                 let userID = this.$store.state.userData._id
                 const {data} = await this.axios.post('/cart/remove',{userID,cartfoodsid})
                if(data.code==0){
                     this.$notify({
                         message:'删除成功',
                         type:'success'
                     })
                     this.$emit('removeItem','aaa')
                }else{
                    this.$notify({
                        message:'删除成功',
                        type:'fail'
                    })
                }

            },
            changeNowCheck(){
                this.$emit('changeCheck',this.index)
            }
        }
    }
</script>

<style scoped lang="less">
 .cartItem{
     padding: 5px;
     .checkBox_wrap{
         display: flex;
         justify-content: center;
         align-items: center;
     }
     .shopName{
         font-size: 19px;
         padding-bottom: 15px;
         text-align: left;
         text-indent: 12px;
     }
     .nowMoney{
         font-size: 17px;
         line-height: 20px;
     }
     .oldMoney{
         font-size: 13px;
         line-height: 20px;
         color: gray;
         text-decoration:line-through;
     }
     img{
         width: 100%;
     }

 }

 .van-stepper--round .van-stepper__plus {
     background: #8DCB3C !important;
     color: white;
 }
</style>
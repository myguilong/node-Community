<template>
    <div class="setheader_wrap">
        <van-nav-bar  title="申请成为团长" left-arrow @click-left="onClickLeft"/>
        <div class="field_wrap">
            <van-field v-model="name" placeholder="你的姓名" label="*姓名" />
            <div class="div"></div>
            <van-field v-model="phone"  placeholder="你的手机号" label="*手机号"/>
            <div class="div"></div>
            <van-field v-model="distcaddress"  placeholder="位置" label="*位置">
                <template #button>
                    <van-button size="small" type="primary" @click="mapaddress">选址地址</van-button>
                </template>
            </van-field>
            <div class="div"></div>
            <van-field v-model="asaddress" placeholder="如门牌号等" label="*详细地址"/>
        </div>
        <div class="setheader_bottom">
            <van-button type="primary" size="large" @click="sumbit">申请团长</van-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: "setHeader",
        data(){
           return {
               phone:'',
               name:'',
               city:'',
               distcaddress:'',
               location:{},
               address:'',
               addressName:"",
               asaddress:"",
               longitude:"",
               latitude:""
           }
        },
        mounted() {

        },
        activated () {
            const {name,address,location} = this.$route.query
            this.address = address 
            this.addressName = name
            this.distcaddress=name!=undefined?`${address} ${name}`:''
            location?this.longitude = location.split(',')[0]:null
            location?this.latitude = location.split(',')[1]:null
            
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1)
            },
            mapaddress(){
                //缓存本页数据
               this.$router.push({
                   path:'/mapLocation?mode=set'
               })
            },
           async sumbit(){
                let longitude = this.longitude
                let latitude = this.latitude
                let name = this.name
                let address = this.distcaddress
                let userId = this.$store.state.userData._id
                let asaddress = this.asaddress
                let phone = this.phone
                let res =await this.axios.post('/leader/create',{ asaddress,longitude,latitude,name,address,userId,phone})
                console.log(res)
                const {data:{msg,code}} = res
                if(code==0){
                    this.$toast('申请成功,待审批')
                    this.$router.push({
                        path:'/userCenter'
                    })
                }   
        
                }
        }
    }
</script>

<style scoped lang="less">
 .setheader_wrap{
      background: #E8E8E8;
     height: 100vh;
     .field_wrap{
         background: white;
         .div{
             margin: 18px;
         }
     }
     .setheader_bottom{
         background: #E8E8E8;
         padding: 15px;
     }
 }
</style>
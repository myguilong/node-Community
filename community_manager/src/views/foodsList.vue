<template>
  <div>
         <Table border :columns="foodsColumns" :data="foodsList">
        <template slot-scope="{ row }" slot="foodsBanner">
            <div class="imgWrap">
              <img v-for="(item, index) in row.foodsBanner" :key="index" class="img" :src="host+'/uploads/foodsDetail/'+item" >
            </div>
        </template>
           <template slot-scope="{ row }" slot="foodsCategory">
            <div>
                {{row.foodsCategory.categoryName}}
            </div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
  </div>
</template>
<script>
import {getFoodsList} from '../utils/request.js'
export default {
    data() {
        return {
            foodsColumns:[
                   {
                        title: '商品名称',
                        key: 'foodsName',
                        width:200
                    },
                    {
                        title: '商品轮播图',
                        slot: 'foodsBanner'
                    },
                      {
                        title: '价格',
                        key: 'foodsPrice',
                        width:120
                    },
                      {
                        title: '库存',
                        key: 'number',
                        width:120
                    },
                     {
                        title: '销量',
                        key: 'accumulate',
                        width:120
                    },
                      {
                        title: '所属分类',
                        slot: 'foodsCategory',
                        width:120
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
            ],
            foodsList:[]
        }
    },
   async mounted(){
        let result = await getFoodsList(this)
        const {data:{data}} = result
        this.foodsList = data
    },
    methods:{
        edit(index){
            this.$router.push({
                path:`/main/foodsEdit/${this.foodsList[index]._id}`
            })
        },
      async remove(index){
           let result = await this.axios.post(`${this.host}/foods/delete`,{id:this.foodsList[index]._id})
          const {data:{code}} = result
          if(code==0){
              this.$Message.success('删除成功')
              let res = await getFoodsList()
              const {data:{data}} = res
              this.foodsList = data

          }
        }
    }
}
</script>
<style lang='less' socped>
     .imgWrap{
         display: flex;
         padding: 5px;
         img{
             width: 100px;
         }
     }
</style>
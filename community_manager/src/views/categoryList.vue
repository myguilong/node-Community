<template>
  <div>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="categoryIcon">
        <img class="img" :src="row.categoryIcon" />
      </template>
       <template slot-scope="{ row }" slot="showInIndex">
           <i-Switch true-color="#13ce66" v-model="row.showInIndex" disabled="disabled"  false-color="#ff4949" />
      </template>
       <template slot-scope="{ row }" slot="isPopular">
           <i-Switch true-color="#13ce66" v-model="row.isPopular" disabled="disabled"  false-color="#ff4949" />
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
        <Button type="warning" size="small" style="margin-right: 5px"  v-has="['admin','editor']" @click="editCategory(row)">编辑</Button>
        <Button type="error" size="small"  v-has="['admin','editor']" @click="remove(index)">删除</Button>
      </template>
    </Table>
    <Divider />
    <Page :total="hasLimit" :page-size="7" show-elevator @on-change="changePage" />
  </div>
</template>
<script>
export default {
        data () {
            return {
                columns12: [
                    {
                        title: '分类名称',
                        key: 'categoryName',
                        width:200
                    },
                    {
                        title: '分类图片',
                        slot: 'categoryIcon',
                        width:120
                    },
                      {
                        title: '是否在首页',
                        slot: 'showInIndex',
                        width:120
                    },
                    {
                        title: '是否热门分类',
                        slot: 'isPopular',
                        width:150
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 200,
                        align: 'center'
                    }
                ],
                data6: [

                ],
                limit:1,//分类页数
                hasLimit:0
            }
        },
        async mounted(){
              let result = await this.axios(`${this.host}/category/list?pageNum=1`)
              let {data:{data:{arr,allLength}}} = result
              arr = arr.map(item=>{
                  return {
                   categoryIcon:this.host+'/uploads/category/'+item.categoryIcon,
                   categoryName:item.categoryName,
                   _id:item._id,
                   showInIndex:item.showInIndex,
                   isPopular:item.isPopular
                  }
              })
              this.data6  = arr
              this.hasLimit = allLength
        },
        methods: {
           async changePage(page){
                  let result = await this.axios(`${this.host}/category/list?pageNum=${page}`)
              let {data:{data:{arr,allLength}}} = result
              arr = arr.map(item=>{
                  return {
                   categoryIcon:this.host+'/uploads/category/'+item.categoryIcon,
                   categoryName:item.categoryName,
                   _id:item._id,
                   showInIndex:item.showInIndex,
                   isPopular:item.isPopular
                  }
              })
              this.data6  = arr
              this.hasLimit = allLength
            },
            show (index) {
                this.$Modal.info({
                    title: this.data6[index].categoryName,
                    content:`<img style='width:200px;height:200px' src='${this.data6[index].categoryIcon}'/>`
                })
            },
            editCategory(row){
               this.$router.push({
                   path:`/main/categoryEdit/${row._id}`
               })
            },
            remove (index) {
                let id = this.data6[index]._id
                this.data6.splice(index, 1);
                this.axios.post(`${this.host}/category/remove`,{
                    id
                })
            }
        }
    }
</script>
<style lang='less' scoped>
.img {
  width: 80px;
  height: 80px;
}
</style>

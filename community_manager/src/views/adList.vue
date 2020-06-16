<template>
  <div>
       <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="bgImg">
            <img class="img" :src="host+'/uploads/adBanner/'+row.bgImg" >
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
         columns12: [
                    {
                        title: '广告图片',
                        slot: 'bgImg',
                        width: 900,
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: [
        
                ]
    };
  },
  async mounted() {
       let res = await this.axios.get(`${this.host}/adBanner/list`)
       const {data:{data}} = res
       this.data6 = data
  },
  methods: {
      show(index){
           this.$Modal.info({
                     render(h){
                            return h('div',{style:{width:'100px',height:'100px',background:'#ccc'}},[h('p','内容2')],'内容1')
                     }, 
                    // title: this.data6[index].categoryName,
                    // content:`<img  src='${this.host}/uploads/adBanner/${this.data6[index].bgImg}'/>`
                })
      },
      remove(){

      }
  },
  
};
</script>
<style lang='less'>
</style>
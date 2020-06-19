<template>
  <div>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="操作">
        <Button type="primary" size="small" style="margin-right: 5px" @click="showMap(index)">地图位置</Button>
        <Button type="error" size="small" @click="passLeader(index)">审核团长</Button>
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
                        title: '团长姓名',
                        slot: 'name'
                    },
                    {
                        title: '小区名字',
                        key: 'address'
                    },
                    {
                        title: '地址',
                        key: 'asaddress'
                    },
                    {
                        title: '操作',
                        slot: '操作',
                        width: 300,
                        align: 'center'
                    }
                ],
                data6: [
                 
                ]
    };
  },
  mounted() {
      this.getApply();
  },
  methods: {
    async getApply(){
      //团长申请列表
      let res = await this.axios.get('/leader/apply')
      const {data:{data}} = res
      this.data6 = data
    },
    showMap(index){
         let location = this.data6[index].location
         let lng = location[0]
         let lat = location[1]
         this.$router.push({
           path:`/main/mapLocation?lng=${lng}&lat=${lat}`
         })
    },
    async passLeader(index){
        const {_id:id} = this.data6[index]
        // console.log(id)
        let res = await this.axios.post('/leader/passLeader',{id})
        const {data} = res
        console.log(data)
          this.$Notice.open({title: '审核成功'});
          this.getApply();
    }
  }
};
</script>

<style>
</style>
<template>
  <div>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">地图位置</Button>
        <Button type="error" size="small" @click="remove(index)">审核团长</Button>
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
                        slot: 'action',
                        width: 300,
                        align: 'center'
                    }
                ],
                data6: [
                 
                ]
    };
  },
  mounted() {
      this.getApply()
  },
  methods: {
    async getApply(){
      //团长申请列表
      let res = await this.axios.get('/leader/apply')
      console.log(res)
    }
  }
};
</script>

<style>
</style>
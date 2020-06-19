<template>
  <div>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看地图位置</Button>
        <Button type="error" size="small" @click="revoke(index)">撤销团长</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { editTime } from "../utils/until";
export default {
  data() {
    return {
      columns12: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "详细地址",
          key: "asaddress"
        },
        {
          title: "申请时间",
          key: "registerTime"
        },
        {
          title: "Action",
          slot: "action",
          width: 350,
          align: "center"
        }
      ],
      data6: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      //团长申请列表
      let res = await this.axios.get("/leader/list");
      const {
        data: { data }
      } = res;
      let arr = data.map(item => {
        return {
          location: item.location,
          isNow: item.isNow,
          name: item.name,
          address: item.address,
          phone: item.phone,
          asaddress: item.asaddress,
          userId: item.userId,
          registerTime:editTime(item.registerTime),
          _id:item._id
        };
      });
      this.data6 = arr;
    },
    show(index) {
      let location = this.data6[index].location;
      let lng = location[0];
      let lat = location[1];
      this.$router.push({
        path: `/main/mapLocation?lng=${lng}&lat=${lat}`
      });
    },
    async revoke(index){
      const {_id:id} = this.data6[index]
      let res =await this.axios.post('/leader/revoke',{id})
      const {data:{code}} = res
      if(code==0){
        this.$Notice.open({title: '撤销成功'});
        this.getList();
      }
    }
  }
};
</script>
<style>
</style>
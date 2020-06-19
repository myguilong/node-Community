<template>
  <div>
    <Table border :columns="columns12" :data="data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
      </template>
    </Table>
       <Divider />
    <Page :total="pageLength" />
  </div>
</template>

<script>
import { editTime } from "../utils/until";
export default {
  data() {
    return {
      pageLength: 0,
      columns12: [
        {
          title: "邮箱号",
          key: "mail"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title:'可用虚拟金额',
          key:"money"
        },
        {
          title: "注册时间",
          key: "registerTime"
        }
      ],
      data: []
    };
  },
  mounted() {
    this.getManagerList();
  },
  methods: {
    async getManagerList() {
      let res = await this.axios.get("/webUser/list");
      const {
        data: { data }
      } = res;
      this.pageLength = data.allLength
      let arr = data.arr.map(item=>{
        return {
          mail:item.mail,
          money:item.money,
          name:item.name,
          registerTime:editTime(item.registerTime),
          userHeader:item.userHeader,
          _id:item._id
        }
      })
      this.data = arr
    }
  }
};
</script>

<style>
</style>
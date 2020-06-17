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
      console.log(res);
      const {
        data: { data }
      } = res;
      console.log(data);
      this.pageLength = data.allLength
      
      this.data = data.arr
    }
  }
};
</script>

<style>
</style>
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
  </div>
</template>

<script>
import { editTime } from '../utils/until'
export default {
  data() {
    return {
               columns12: [
                    {
                        title: '邮箱号',
                        key: 'mail'
                    },
                    {
                        title: '注册时间',
                        key: 'registerTime'
                    }
                ],
                data: [ ]
    };
  },
  mounted() {
      this.getManagerList()
  },
  methods: {
      async getManagerList(){
         let res = await  this.axios.get('/login/list')
         const {data:{data}} = res
         console.log(data)
         let arr = data.map(item=>{
             return {
                 mail:item.mail,
                 registerTime:editTime(item.registerTime)
             }
         })
         this.data = arr
      }
  }
};
</script>

<style>
</style>
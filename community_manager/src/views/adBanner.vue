<template>
  <div>
    <Row>
      <Col :span="18">
        <Upload
          multiple
          type="drag"
          action="///"
          :show-upload-list="false"
          :before-upload="handleUpload"
        >
          <img v-show="imgSrc" :src="imgSrc" alt />
          <div style="padding: 20px 0" v-show="!imgSrc">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽上传</p>
          </div>
        </Upload>
      </Col>
    </Row>
    <Row>
        <Col :span="18">
            <Button type="success" long @click="sumbit">提交</Button>
        </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgSrc: "",
      imgFile:null
    };
  },
  methods: {
    handleUpload(e) {
        this.imgFile = e
      let redFile = new FileReader();
      redFile.onload = e => {
        this.imgSrc = e.target.result;
      };
      redFile.readAsDataURL(e);
      return false;
    },
    async sumbit(){
        let data = new FormData()
        data.append('bg',this.imgFile)
        let res = await this.axios.post(`${this.host}/adBanner/create`,data,{ headers:{'content-type': 'application/x-www-form-urlencoded'}})
        const {data:{code}} = res
        if(code){
            this.$Message.success('添加成功')
        }
    }
  }
};
</script>
<style lang='less'>
</style>
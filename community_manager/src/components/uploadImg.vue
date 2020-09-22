<template>
  <div class="uploadWrap">
    <input
      class="file"
      id="fileSelect"
      @change="selectImg"
      type="file"
      ref="upload"
      style="opacity: 0"
    />
    <button @click="showSelectImg" v-show="!showImgSrc">选择图片</button>
    <div @click="showSelectImg" v-show="showImgSrc">
      <img :src="showImgSrc"  class="specImg"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        showImgSrc:''
    };
  },
  mounted() {},
  methods: {
    showSelectImg() {
      // let selectImg = document.getElementById('fileSelect');
      this.$refs.upload.click();
    },
    selectImg($event) {
      let imgFile = this.$refs.upload.files[0];
      let redFile = new FileReader();
      this.$emit('setSpecImg',imgFile)
      redFile.onload = e => {
        this.showImgSrc = e.target.result
      };
      redFile.readAsDataURL(imgFile);
    },
  },
  components: {},
  watch: {}
};
</script>

<style scoped lang="less">
.file {
  background: white;
}
.uploadWrap {
  position: relative;
  input {
    position: absolute;
  }
  button {
    // position: absolute;
    background: #3399ff;
    border: none;
    padding: none;
    height: 30px;
    line-height: 30px;
    color: white;
    width: 90%;
  }
  .specImg{
      width: 70%;
  }
}
</style>

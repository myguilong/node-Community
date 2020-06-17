<template>
  <div class="allWrap">
    <Row>
      <Col span="12">
        <Input v-model="category" placeholder="输入分类名称" style="width: 300px" />
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="6">
        是否添加在首页:
        <i-Switch v-model="ishow">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-Switch>
      </Col>
      <Col span="6">
        是否是热门分类:
        <i-Switch v-model="isPopular" @>
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-Switch>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="20">
        <Upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline">选择图片</Button>
        </Upload>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="6">
        <img class="smoleImg" v-if="showImg" :src="showImg" />
      </Col>
    </Row>
    <Row>
      <Col span="6">
        <Button type="success" @click="createCategory">{{id?'编辑分类':'创建分类'}}</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import { Mixin } from "../mixins/setData";
export default {
  name: "categoryEdit",
  props: {
    id: {}
  },
  mixins: [Mixin],
  data() {
    return {
      category: "",
      file: null,
      loadingStatus: false,
      showImg: "",
      ishow: false,
      isPopular: false
    };
  },
  async mounted() {
    if (this.id) {
      //如果是编辑分类
      const result = await this.axios.get(
        `${this.host}/category/detail?id=${this.id}`
      );
      const {
        data: { data }
      } = result;
      this.category = data.categoryName;
      this.ishow = data.showInIndex;
      this.isPopular = data.isPopular;
      this.showImg = `${this.host}/uploads/category/${data.categoryIcon}`;
    }
  },
  methods: {
    handleUpload(file) {
      if (file.type.indexOf("image") == -1) {
        this.$Message.error("请选择图片");
        return false;
      }
      this.file = file;
      let redFile = new FileReader();
      redFile.onload = e => {
        this.showImg = e.target.result;
      };
      redFile.readAsDataURL(file);
      return false;
    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success("Success");
      }, 1500);
    },
    async createCategory() {
      if (this.id) {
        //编辑分类
        let data = new FormData();
        data.append("name", this.category);
        data.append("isPopular", this.isPopular);
        data.append("showInIndex", this.ishow);
        data.append("id", this.id);
        if (this.file) {
          //如果你传了文件
          data.append("icon", this.file);
        } else {
          //如果没有去上传文件 就使用原来的图片
          data.append(
            "oldImg",
            this.showImg.split("/")[this.showImg.split("/").length - 1]
          );
        }
        let result = await this.axios.post(
          `${this.host}/category/update`,
          data
        );
        const {
          data: { code, msg }
        } = result;
        if (code == 0) {
          this.$Message.success("编辑成功");
          this.file = null;
          this.name = "";
          this.category = "";
          this.showImg = "";
          this.isPopular = false;
          this.showInIndex = false;
          this.$router.push({
            path: "/main/categoryList"
          });
        } else {
          this.$Message.success("编辑失败");
        }
      } else {
        //创建分类
        let data = new FormData();
        data.append("icon", this.file);
        data.append("name", this.category);
        data.append("isPopular", this.isPopular);
        data.append("showInIndex", this.ishow);
        let result = await this.axios.post(
          `${this.host}/category/create`,
          data,
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            }
          }
        );
        const {
          data: { code, msg }
        } = result;
        if (code != 0) {
          this.$Message.error(msg);
        } else {
          this.$Message.success(msg);
          this.file = null;
          this.name = "";
          this.category = "";
          this.showImg = "";
          this.isPopular = false;
          this.showInIndex = false;
          this.$router.push({
            path: "/main/categoryList"
          });
        }
      }
    }
  },
  beforeDestroy() {
    //  let arr = this.pageArr.pageArr.filter(item=>item.fullPath==this.$store.state.nowRouter)
    //  if(arr.length!=0){
    //     let json = {}
    //     json[this.$store.state.nowRouter] = this.$data
    //     this.$store.commit('setPageData',json)
    //  }
  }
};
</script>
<style lang='less'>
.smoleImg {
  width: 200px;
  height: 200px;
}
</style>

<template>
  <div>
    <Row class="foodsTitle">
      <Col :span="3">
        <span>商品名称：</span>
      </Col>
      <Col :span="5">
        <Input v-model="foodsName" placeholder="商品名称" />
      </Col>
      <Col :span="3">
        <span>商品分类：</span>
      </Col>
      <Col :span="5">
        <Select v-model="selectCategory">
          <Option
            v-for="item in categoryList"
            :value="item._id"
            :key="item._id"
          >{{ item.categoryName }}</Option>
        </Select>
      </Col>
    </Row>
    <Row class="foodsTitle">
      <Col :span="3">
        <span>商品产地:</span>
      </Col>
      <Col :span="5">
        <Input v-model="form" placeholder="商品产地" />
      </Col>
      <Col :span="4">
        <span>配送时间(默认明天):</span>
      </Col>
      <Col :span="5">
        <DatePicker v-model="postTime" type="date" placeholder="选择时间" @on-change="selectDate"></DatePicker>
      </Col>
    </Row>
    <Row class="foodsTitle">
      <Col :span="3">
        <span>对比价格:</span>
      </Col>
      <Col :span="5">
        <Input v-model="foodsOldPrice" placeholder="对比价格" />
      </Col>
      <Col :span="4">
        <span>商品价格:</span>
      </Col>
      <Col :span="5">
        <Input v-model="foodsPrice" placeholder="商品价格" />
      </Col>
    </Row>

    <Row class="foodsTitle">
      <Col :span="3">
        <span>商品规格:</span>
      </Col>
      <Col :span="5">
        <Input v-model="foodsSpecifications" placeholder="(规格)" />
      </Col>
      <Col :span="4">
        <span>商品库存:</span>
      </Col>
      <Col :span="5">
        <Input v-model="number" type="number" placeholder="商品库存" />
      </Col>
    </Row>
    <Row class="foodsTitle">
      <Col :span="3">
        <span>商品供应商:</span>
      </Col>
      <Col :span="5">
        <Input v-model="Supplier" placeholder="(商品供应商)" />
      </Col>
      <Col :span="4">
        <span>商品简介:</span>
      </Col>
      <Col :span="8">
        <Input
          v-model="foodsText"
          maxlength="100"
          show-word-limit
          type="textarea"
          placeholder="商品简介..."
        />
      </Col>
    </Row>
    <Row class="foodsTitle">
      <Col :span="5">商品规格:</Col>
      <Col :span="15">
        <Button type="success" @click="addSpec" v-show="specData.length==0">添加规格</Button>
        <Row v-for="(item,index) in specData" :key="index" :gutter="16">
          <Col :span="6">
            <up-img @setSpecImg="setSpecImg"/>
          </Col>
          <Col :span="6">
            <Input v-model="item.specName" placeholder="规格名称" />
          </Col>
          <Col :span="3">
            <Input v-model="item.money" placeholder="规格价格" />
          </Col>
          <Col :span="3">
            <Input v-model="item.number" placeholder="规格库存" />
          </Col>
          <Col :span="6">
            <Button type="primary" shape="circle" icon="ios-add-circle-outline" @click="addSpec"></Button>&nbsp;&nbsp;&nbsp;
            <Button
              type="primary"
              shape="circle"
              icon="ios-trash-outline"
              @click="deleteSpec(index)"
            ></Button>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row class="foodsTitle">
      <Col :span="3">商品轮播图:</Col>
      <Col :span="18">
        <Upload
          multiple
          :before-upload="handleBannerUpload"
          :show-upload-list="false"
          type="drag"
          action
        >
          <div style="padding:20px" v-if="bannerShowImg.length==0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p style="line-height:30px">点击或拖拽上传文件(最多5张)</p>
          </div>
          <div class="imgList" v-if="bannerShowImg.length>0">
            <img
              v-for="(item, index) in bannerShowImg"
              :key="index"
              :src="item"
              @click.stop="deleteImg(index)"
            />
          </div>
        </Upload>
      </Col>
    </Row>
    <Row class="foodsTitle">
      <Col :span="3">商品详情图:</Col>
      <Col :span="18">
        <Upload
          multiple
          :before-upload="handleDetailUpload"
          :show-upload-list="false"
          type="drag"
          action
        >
          <div style="padding:20px" v-if="detailShowImg.length==0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p style="line-height:30px">点击或拖拽上传文件(最多5张)</p>
          </div>
          <div class="imgList" v-if="detailShowImg.length>0">
            <img
              v-for="(item, index) in detailShowImg"
              :key="index"
              :src="item"
              @click.stop="deleteDetailImg(index)"
            />
          </div>
        </Upload>
      </Col>
    </Row>
    <div class="wrapButton">
      <Button type="success" label="large" @click="addFoods">{{id?'编辑商品':'添加商品'}}</Button>
    </div>
  </div>
</template>
<script>
import { getCategoryList } from "../utils/request.js";
import { Mixin } from "../mixins/setData";
import upImg from '../components/uploadImg'
export default {
  mixins: [Mixin],
  props: {
    id: {}
  },
  components:{
     upImg
  },
  data() {
    return {
      foodsName: "",
      categoryList: [],
      selectCategory: "",
      postTime: "",
      Supplier: "",
      form: "",
      foodsPrice: "",
      foodsOldPrice: "",
      foodsSpecifications: "",
      number: "",
      foodsText: "",
      bannerFiles: [],
      bannerShowImg: [],
      detailFiles: [],
      detailShowImg: [],
      spec: [], //添加规格的数组，根据长度去渲染列表
      specData: [],
      oldBannerShowImg: [],
      oldDetailShowImg: [],
      specImgList:[]
    };
  },
  async mounted() {
    if (this.id) {
      let res = await this.axios(`${this.host}/foods/detail`, {
        params: { id: this.id }
      });
      const {
        data: { data, spec }
      } = res;
      this.foodsText = data.foodsText;
      this.number = data.number;
      this.form = data.form;
      this.Supplier = data.Supplier;
      this.foodsName = data.foodsName;
      this.selectCategory = data.foodsCategory._id;
      this.postTime = data.foodsDelivery;
      this.foodsOldPrice = data.foodsOldPrice;
      this.foodsPrice = data.foodsPrice;
      this.foodsSpecifications = data.foodsSpecifications;
      this.bannerShowImg = data.foodsBanner.map(item => {
        return this.host + "/uploads/foodsDetail/" + item;
      });
      this.detailShowImg = data.foodsImgList.map(
        item => this.host + "/uploads/foodsDetail/" + item
      );
      this.oldBannerShowImg = data.foodsBanner;
      this.oldDetailShowImg = data.foodsImgList;
      if (data.hasSpecification) {
        let arr = spec.specifArry.map(item => JSON.parse(item));
        this.specData = arr;
      }
    } else {
      console.log(this.$route);
    }
    let result = await getCategoryList(this);

    const {
      data: { data }
    } = result;
    this.categoryList = data;
  },
  methods: {
    setSpecImg(img){
       this.specImgList.push(img)
    },
    deleteSpec(index) {
      this.specData.splice(index, 1);
    },
    deleteImg(index) {
      if (this.id) {
        //如果是编辑商品
        this.bannerFiles.splice(index, 1);
        this.bannerShowImg.splice(index, 1);
        this.oldBannerShowImg.splice(index, 1);
      } else {
        this.bannerFiles.splice(index, 1);
        this.bannerShowImg.splice(index, 1);
      }
    },
    deleteDetailImg(index) {
      if (this.id) {
        this.detailFiles.splice(index, 1);
        this.detailShowImg.splice(index, 1);
        this.oldDetailShowImg.splice(index, 1);
      } else {
        this.detailFiles.splice(index, 1);
        this.detailShowImg.splice(index, 1);
      }
    },
    selectDate(date) {
      this.postTime = date;
    },
    addSpec() {
      //添加规格
      this.specData.push({});
    },
    handleBannerUpload(files) {
      if (this.bannerFiles.length == 5) {
        this.$Message.error("最多只能五张图片！");
      } else {
        this.bannerFiles.push(files);
        let redFile = new FileReader();
        redFile.onload = e => {
          this.bannerShowImg.push(e.target.result);
        };
        redFile.readAsDataURL(files);
      }
      return false;
    },
    handleDetailUpload(files) {
      if (this.detailFiles.length == 5) {
        this.$Message.error("最多只能五张图片！");
      } else {
        this.detailFiles.push(files);
        let redFile = new FileReader();
        redFile.onload = e => {
          this.detailShowImg.push(e.target.result);
        };
        redFile.readAsDataURL(files);
      }
      return false;
    },
    async addFoods() {
      let data = new FormData();
      this.bannerFiles.map(item => {
        data.append("banner", item);
      });
      this.detailFiles.map(item => {
        data.append("detailImg", item);
      });
      
      if (!this.postTime) {
        this.postTime = this.getDate(1)
      }
      data.append("foodsName", this.foodsName);
      data.append("Supplier", this.Supplier);
      data.append("foodsPrice", this.foodsPrice);
      data.append("foodsOldPrice", this.foodsOldPrice);
      data.append("foodsText", this.foodsText);
      data.append("number", this.number);
      data.append("foodsCategory", this.selectCategory);
      data.append("foodsDelivery", this.postTime);
      data.append("form", this.form);
      data.append("foodsSpecifications", this.foodsSpecifications);
      if (this.id) {
        this.oldBannerShowImg.map(item => {
          data.append("oldBannerimgList", item);
        });
        this.oldDetailShowImg.map(item => {
          data.append("oldFoodsimgList", item);
        });
        data.append("_id", this.id);
      }
      if (this.specData.length > 0) {
        this.specData.map(item =>
          data.append("specification", JSON.stringify(item))
        );
        this.specImgList.map(item=>{
          data.append('specificationImg',item)
        })
      }
      try {
        let result = null;
        if (this.id) {
          //是编辑
          result = await this.axios.post(`${this.host}/foods/update`, data, {
            headers: { "content-type": "application/x-www-form-urlencoded" }
          });
        } else {
          //是新添加
          result = await this.axios.post(`${this.host}/foods/create`, data, {
            headers: { "content-type": "application/x-www-form-urlencoded" }
          });
        }
        if (result.data.code == 0) {
          this.$Message.success("添加成功");
          this.foodsName = "";
          this.Supplier = "";
          this.foodsPrice = "";
          this.foodsOldPrice = "";
          this.foodsText = "";
          this.number = "";
          this.postTime = "";
          this.form = "";
          this.selectCategory = "";
          this.foodsSpecifications = "";
          this.bannerFiles = [];
          this.bannerShowImg = [];
          this.detailFiles = [];
          this.detailShowImg = [];
          this.specData = [];
          this.$router.push({ path: "/main/foodsList" });
        }
      } catch (e) {
        // console.log(e)
      }
    },
    getDate(index) {
      
      //一整天换算成毫秒是86400000；
      var time = new Date().getTime() + parseInt(index) * 86400000;
      //将毫秒转换成日期（YYYY-MM-DD）
      var date = new Date(time)
        .toLocaleString()
        .replace(/\//g, "-")
        .split(" ")[0]
        .toString();
      return date;
    }
  }
};
</script>
<style lang='less' scoped>
.foodsTitle {
  text-align: right;
  line-height: 60px;
  margin-top: 5px;
}
.imgList {
  padding-top: 10px;
  img {
    width: 100px;
    height: 100px;
  }
}
.wrapButton {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
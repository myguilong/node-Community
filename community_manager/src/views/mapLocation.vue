<template>
  <div id="container" :style="{width:'100%',height:'600px'}">
    <div :style="{width:'100%',height:'600px'}">
      <!-- <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>-->
    </div>
  </div>
</template>
<style>
.amap-demo {
  height: 300px;
}
</style>
<script>
export default {
  data() {
    return {
      
       
      
    };
  },
  mounted() {
        const { lng, lat } = this.$route.query;
        var marker, map = new AMap.Map("container", {
          resizeEnable: true,
          center: [lng, lat],
          zoom: 18
        });
         marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: [lng,lat],
            offset: new AMap.Pixel(-13, -30)
        });
        marker.setMap(map);
  }
};
</script>
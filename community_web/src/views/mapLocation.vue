<template>
  <div>
    <iframe
      id="getAddress"
      @load="loadiframe"
      frameborder="0"
      src="https://m.amap.com/picker/?keywords=写字楼,小区,学校&zoom=15&center=&radius=1000&total=20&key=474d31d29e87d15a9584920045956ef4"
      　　　　style="width:100%; height:100%;position: absolute;left:0;z-index:22222;"
    ></iframe>
  </div>
</template>
<script>
export default {
  name: "mapLocation",
  data() {
    return {};
  },
  methods: {
    loadiframe() {
      let iframe = document.getElementById("getAddress").contentWindow;
      iframe.postMessage("hello", "https://m.amap.com/picker/");
      window.addEventListener(
        "message",
        function(e) {
          if (e.data.command != "COMMAND_GET_TITLE") {
            //实现业务代码
            let a = this.$route.query.id;
            let are = this.$route.query.are;
            let address = e.data.address;
            let location = e.data.location;
            let name = e.data.name;
            const { mode } = this.$route.query;
            if (mode == "select") {
                localStorage.setItem('location',location)
                localStorage.setItem('address',address)
                this.$router.go(-1)
            }
            if ((mode == "set")) {
              this.$router.push({
                path: "/setHeader",
                query: { address, location, name }
              });
            }
          }
        }.bind(this),
        false
      );
    }
  }
};
</script>

<style scoped>
</style>
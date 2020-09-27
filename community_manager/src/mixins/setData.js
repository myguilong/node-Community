export const Mixin = {
    inject:['pageArr'],
    mounted(){
        if(this.$store.getters.nameInfo(this.$route.fullPath)!=undefined){
            Object.assign(this.$data, this.$store.getters.nameInfo(this.$route.fullPath))
        }
     },
    beforeDestroy() {
        let arr = this.pageArr.pageArr.filter(item=>item.fullPath==this.$store.state.nowRouter)
        if(arr.length!=0){
           let json = {}
           json[this.$store.state.nowRouter] = this.$data
           this.$store.commit('setPageData',json)
        }
    }
}

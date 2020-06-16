import vCenter from "./vCenter";
export default {
    install(vue) {
        vue.component(vCenter.name,vCenter)
    }
}

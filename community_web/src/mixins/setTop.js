export const Mixin = {
    data() {
        return {
            scrollTop:0
        }
    },
    mounted() {
        window.addEventListener("scroll",this.handleScroll); 
    },
    methods: {
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop = scrollTop
        }
    },
    activated() {
        if (this.scrollTop) {
            document.documentElement.scrollTop = this.scrollTop
        }
        window.addEventListener("scroll", this.handleScroll);
    },
    deactivated() {
        window.removeEventListener("scroll", this.handleScroll)
    },
    destroy() {
        this.$destroy()
    }
}
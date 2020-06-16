module.exports = {
    isArray(o){
            return Object.prototype.toString.call(o) === '[object Array]'; 
    }
}
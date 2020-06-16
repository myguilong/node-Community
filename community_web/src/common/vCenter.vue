<template>
    <div class="visCenter">
       <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "vCenter"
    }
</script>

<style scoped lang="less">
     .visCenter{
         display: flex;
         justify-content: center;
         align-items: center;
     }
</style>
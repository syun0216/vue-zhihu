<template lang="html">
  <!-- <group style="border:none">
      <cell v-if="isShow" @click.native="reload" title="加载失败,请点击重试..."></Cell>
  </group> -->
  <div class="bottomLoading" v-if="isShow" @click="reload">
    <p>加载失败,请点击重试...</p>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  components:{
  },
  props:{
    isShow:{
      default:false,
      type:Boolean
    },
    reload:{
      default:null,
      type:Function
    }
  }
}
</script>

<style lang="less">
  .bottomLoading{
    text-align: center;
    background:white;
  }
</style>

<template lang="html">
  <group style="border:none">
      <cell v-if="isShow" @click.native="reload" title="加载失败,请点击重试..."></Cell>
  </group>
</template>

<script>
import {Cell,Group} from 'vux'
export default {
  data(){
    return {

    }
  },
  components:{
    Cell,
    Group
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
</style>

<template lang="html">
  <div class="error_content">
    <div class="error_click">
      <x-button @click.native="reload">请求数据失败,请点击重试</x-button>
      请求数据失败,请点击重试
    </div>
  </div>
</template>

<script>
import XButton from 'vux';
export default {
  components:{
    XButton
  },
  methods:{
  },
  props:{
    reload:{
      type:Function,
      default:null
    }
  }
}
</script>

<style lang="less">
.error_content{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
z-index: 100;
  .error_click{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
  }
}
</style>

<template lang="html">
  <div class="loading">
    <div class="spinner">
      <spinner type="ios-small" slot="value"></spinner>
    </div>
    <p class="content">正在加载中，请稍候...</p>
  </div>
</template>

<script>
import { Spinner } from 'vux'
export default {
  components:{
    Spinner
  }
}
</script>

<style lang="less">
.loading{
  position:fixed;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,0.3);
  z-index: 100;
  .spinner{
    width:50px;
    height:50px;
    position: absolute;
    top:50%;
    left: 50%;
    margin:-25px 0 0 -25px;
  }
  .content{
    position:absolute;
    top:49%;
    left:25%;
    color:white;
    text-align: center
  }
}
</style>

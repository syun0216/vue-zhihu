<template lang="html">
  <div class="d_loading">
    <div class="spinner">
      <spinner type="lines" slot="value"></spinner>
    </div>
    <p class="loading_content">正在加载中，请稍候...</p>
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
.d_loading{
  position:fixed;
  width: 100%;
  height: 100%;
  background:white;
  top:0;
  left: 0;
  z-index: 100;
  .spinner{
    width:50px;
    height:50px;
    position: absolute;
    top:50%;
    left: 50%;
    margin:-25px 0 0 -25px;
  }
  .loading_content{
    position:absolute;
    top:49%;
    left:50%;
    display: inline-block;
    margin-left:-78px;
    color:#959595;
    text-align: center
  }
}
</style>

<template lang="html">
  <div class="error_content">
    <div class="error_img">
      <img src="./../assets/cry.png" alt="请求失败图片">
    </div>
    <div class="error_click">
      <x-button @click.native="reload" type="primary" v-if="reloadParams == null">请求数据失败,请点击重试...</x-button>
      <x-button @click.native="reload(reloadParams.id)" type="primary" v-if="reloadParams != null">请求数据失败,请点击重试...</x-button>
    </div>
  </div>
</template>

<script>
import {XButton} from 'vux';
export default {
  data(){
    return {

    }
  },
  components:{
    XButton
  },
  methods:{

  },
  props:{
    reload:{
      type:Function,
      default:null
    },
    reloadParams:{
      type:Object,
      default:null
    }
  },
  mouted(){
    // console.log(this._props.reloadParams);
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
z-index: 999;
background:white;
  .error_img{
    position: absolute;
    top:30%;
    left:50%;
    margin-left: -64px;
    margin-top:-64px;
    img{
      width:100%;
    }
  }
  .error_click{
    width:80%;
    position: absolute;
    bottom:30%;
    left: 50%;
    margin-left:-256/2px;
  }
}
</style>

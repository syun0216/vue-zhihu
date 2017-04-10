<template lang="html">
  <div class="title">
    <span v-if="canBack" class="back" @click="goBack"><img src="./../assets/back.png" alt="返回按钮"></span>
    <span class="content">{{content}}</span>
    <span v-if="shareUrl != null" class="share"><img src="./../assets/share.png" alt="" @click="goShare()"></span>
  </div>
</template>

<script>
export default {
  props:{
    content:{
      type:String,
      default:"",
      require:true
    },
    canBack:{
      type:Boolean,
      default:true
    },
    shareUrl:{
      type:String,
      default:null
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    goShare(){
      if(this.shareUrl){
        window.open(this.shareUrl);
      }
    }
  },
  created(){

  }

}
</script>

<style lang="less">
.title{
  position:fixed;
  top:0;
  left: 0;
  width:100%;
  height: 40px;
  border:1px solid #ddd;
  z-index: 999;
  background: white;
  .back{
    width:15px;
    img{
      width:30px;
      position: absolute;
      left: 8px;
      top:4px;
    }
  }
  .share{
    img{
      width:23px;
      position: absolute;
      right: 12px;
      top:7px;
    }
  }
  .content{
    display:inline-block;
    margin-top: 8px;
    font-size:16px;
  }
}
</style>

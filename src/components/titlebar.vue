<template lang="html">
  <div class="title">
    <span v-if="canBack" class="back" @click="goBack"><img src="./../assets/back.png" alt="返回按钮"></span>
    <span class="t_content">{{content}}</span>
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
    },
    backFunc:{
      type:Function,
      default:null
    }
  },
  methods:{
    goBack(){
      if(this.$props.backFunc == null){
          this.$router.go(-1);
      }
      else{
        this.$props.backFunc();
      }
    },
    goShare(){
      if(this.shareUrl){
        window.open(this.shareUrl);
      }
    }
  },
  mounted(){

  }

}
</script>

<style lang="less">
.title{
  position:fixed;
  top:0;
  left: 0;
  width:100%;
  height: 45px;
  z-index: 999;
  color:white;
  background-image: linear-gradient(0deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.7) 95%);
  .back{
    width:15px;
    img{
      width:19px;
      position: absolute;
      left: 8px;
      top:9px;
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
  .t_content{
    display:inline-block;
    margin-top: 8px;
    font-size:17px;
    color:white;
  }
}
</style>

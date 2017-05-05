<template lang="html">
  <div id="title">
    <span v-if="canBack" class="back" @click="goBack"><img src="./../assets/back.png" alt="返回按钮"></span>
    <span class="t_content">{{content}}</span>
    <span v-if="shareUrl != null" class="share"><img src="./../assets/share.png" alt="" @click="goShare()"></span>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    content:{
      type:String,
      default:"文章详情",
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
  computed:{
    ...mapState({
      scrollerTop:state => state.scrollerTop
    })
  },
  watch:{
    scrollerTop(){
      let _top = this.scrollerTop;
      let _dom = document.getElementById("title");
      if(_top >= 180 && _top <= 420){
        let _opacity = _top/420;
        _dom.style.background = `rgba(30, 144, 255, ${_opacity})`;
      }
      else if(_top < 180){
        _dom.style.background = "linear-gradient(0deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.6) 95%)";
        _dom.style.opacity = 1;
      }
    }
  }

}
</script>

<style lang="less">
#title{
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
      top:12px;
    }
  }
  .share{
    img{
      width:23px;
      position: absolute;
      right: 12px;
      top:10px;
    }
  }
  .t_content{
    display:inline-block;
    margin-top: 10px;
    font-size:17px;
    color:white;
  }
}
</style>

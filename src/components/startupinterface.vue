<template>
  <div v-if="imgSrc !== null" class="startup">
    <div :class="{transitionLeft:isHide}">
      <p>知乎日报 by Syun</p>
      <img :src="imgSrc" alt="" >
      <button @click="skip">跳过</button>
    </div>
  </div>
</template>
<script>
  import api from '../api/index'
  export default{
      data(){
          return {
              imgSrc:null,
              isHide:false,
              loadReady:false
          }
      },
      methods:{
          getImg(){
            api.getFirstPageImg().then((data) => {
              this.imgSrc = data.data.creatives[0].url;
              this.$emit('loadReady',this.loadReady);
              let _timer = setTimeout(() => {
                this.isHide = true;
                clearTimeout(_timer);
              }, 2000);
            })
          },
        skip(){
          this.isHide = true;
        }
      },
    mounted(){
          this.getImg();
    },
    destroyed(){
        this.isHide = false;
    }
  }
</script>
<style lang="less">
  .startup{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    img{
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: -180px;
      left: 0;
      /*transform: translate(-100vw,0);*/
      /*transition:transform 5s;*/
    }
    p{
      position: absolute;
      bottom:200px;
      text-align: center;
      left: 50%;
      margin-left:-13px;
      color:white;
      z-index: 10001;
      font-size: 20px;
    }
    button{
      position: absolute;
      right: 20px;
      top: -160px;
      border-radius: 5px;
      width:50px;
      height: 30px;
      /*border:1px solid white;*/
      background:rgba(0,0,0,0.5);
      color:white;
      border:none;
    }
    .transitionLeft{
      transform: translate(-100vw,0);
      transition:transform 1s;
    }
  }
</style>

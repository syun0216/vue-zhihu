<template>
  <div>
    <v-loading v-if="isLoading"></v-loading>
    <v-toast v-if="isError" :tips="tips"></v-toast>
    <v-iserror v-if="isError" :reload="getImg"></v-iserror>
    <div class="startup" v-if="imgSrc !== null">
      <div>
        <p :class="{transitionLeft:isHide}">知乎日报 by Syun</p>
        <img :src="imgSrc" alt="" :class="{transitionLeft:isHide}">
        <button @click="skip" :class="{transitionLeft:isHide}">跳过</button>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../api/index'
  export default{
    data(){
      return {
        imgSrc: null,
        isHide: false,
        isLoading: true,
        isError: false,
        tips: null
      }
    },
    methods: {
      getImg(){


        api.getFirstPageImg().then((data) => {
          if (data.data === null || data.data.creatives.length === 0) {
            this.imgSrc = this.imgSrc = "https://pic3.zhimg.com/v2-5af460972557190bd4306ad66f360d4a.jpg";
          }
          else {
            this.imgSrc = data.data.creatives[0].url;
          }
          this.isLoading = false;
          this.tips = "加载完成~";
          let _timer = setTimeout(() => {
            this.isHide = true;
            clearTimeout(_timer);
            this.$router.push(
              {path: 'home'}
            );
          }, 3000);
        }, () => {
          this.isLoading = false;
          this.isError = true;
          this.tips = "加载失败...";
        })
      },
      skip(){
        this.isHide = true;
        this.$router.push(
          {path: 'home'}
        );
      }
    },
    mounted(){
      this.getImg();
    }
  }
</script>
<style lang="less">
  .startup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    img {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
    }
    p {
      position: absolute;
      bottom: 20px;
      text-align: center;
      color: white;
      z-index: 10001;
      font-size: 24px;
      width: 100%;
    }
    button {
      position: absolute;
      right: 20px;
      top: 30px;
      border-radius: 5px;
      width: 50px;
      height: 30px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
    }
    .transitionLeft {
      transform: translate(-100vw, 0);
      transition: transform 1s;
    }
  }
</style>

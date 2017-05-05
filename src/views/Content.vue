<template lang="html">
  <div style="overflow-x: hidden;">
    <v-toast v-if="newsContent!== null" :tips="tips"></v-toast>
    <v-toast v-if="isError" :tips="tips"></v-toast>
    <v-loading v-if="isLoading"></v-loading>
    <v-title-bar v-if="newsContent != null" :content="newsContent.image_source" :shareUrl="newsContent.share_url" :backFunc="clickBack"></v-title-bar>
    <!-- <v-content v-if="newsContent != null"> -->
      <div class="img_div" v-if="newsContent != null">
        <img v-if="titleImg !== null" :src="titleImg" alt="">
        <h3>{{newsContent.title}}</h3>
      </div>
      <div class="html_content" v-html="newsContent.body" v-if="newsContent != null">
      </div>
    <!-- </v-content> -->
    <v-iserror v-if="isError" :reload="getNewsById" :reloadParams="requestData"></v-iserror>
    <v-backtop></v-backtop>

    <!-- 点击放大图片遮罩 -->
    <div class="dis-bg dis-none" ></div>
    <!-- 点击放大图片遮罩 -->
  </div>
</template>

<script>
import api from './../api/index';
export default {
  data() {
    return {
      newsContent: null,
      requestData: {
        id: null
      },
      isLoading: false,
      isError: false,
      linkcss: null,
      titleImg: null,
      imgArr:[],
      showBg:false,
      tips:null
    }
  },
  methods: {
    getNewsById(id) {
      this.isLoading = true;
      this.isError = false;
      api.getNewsById(id).then((data) => {
        this.newsContent = data.data;
        this.titleImg = data.data.image || null;
        this.tips = "加载成功~";
        if (this.newsContent.css.length !== 0 && this.newsContent.css[0] !== null) {
          let _link = document.createElement("link");
          _link.setAttribute("rel", "stylesheet");
          _link.setAttribute("type", "text/css");
          _link.setAttribute("href", this.newsContent.css[0].replace(/http/g,"https"));
          this.linkcss = _link;
          let _headTag = document.getElementsByTagName("head")[0];
          _headTag.appendChild(_link);
        }
        this.isLoading = false;
      }, () => {
        this.tips = "加载失败~";
        this.isLoading = false;
        this.isError = true;
      })
    },
    clickBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.requestData.id = this.$route.query.id;
    this.getNewsById(this.$route.query.id);
    this.$store.commit("changeShowSlideBar",{
      isShow:false
    });
  },
  updated(){
    let _imgArr = document.images;
    let _divBg = document.getElementsByClassName('dis-bg')[0];
    for(let i of _imgArr){
        if(i.classList.contains('content-image')){
          this.imgArr.push(i);
          i.addEventListener('click',function(){
            i.classList.toggle('active-img');
            if(i.classList.contains('active-img')){
              _divBg.classList.remove('dis-none');
            }
            else{
              _divBg.classList.add('dis-none');
            }

            _divBg.addEventListener('click',function(){
              _divBg.classList.add('dis-none');
              i.classList.remove('active-img');
            });
          })
        }
    }
  },
  destroyed(){
    let _headTag = document.getElementsByTagName("head")[0];
    _headTag.removeChild(this.linkcss);
  }

}
</script>

<style lang="less">
.img_div {
    width: 100%;
    position: relative;
    margin-bottom: 15px;
    img {
        width: 100%;
    }
    h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        position: absolute;
        bottom: 0;
        padding: 8px 5px 0;
        color: white;
        font-size: 17px;
        font-family: "微软雅黑";
        width: 100%;
        background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 95%);
        height: 46px;
    }
}
.content {
    font-size: 16px !important;
}
.html_content{
  margin-top:-14px;
}
.headline .img-place-holder {
    height: 0 !important;
}
.active-img{
  position:fixed;
  top:30%;
  left: 0;
  z-index: 20;
  transition:transform .5s;
  transform: scale(1.1);
  z-index:999;
  display: flex;
  align-items: center;
}
.dis-bg{
  background:#222;
  opacity:1;
  position: fixed;
  top:0;
  left: 0;
  width:100%;
  height: 100%;
  z-index: 998;
  transition:opacity 1s;
}
.dis-none{
  display: none;
}
.weui-toast__content{
  margin:0 !important;
}
</style>

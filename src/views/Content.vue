<template lang="html">
  <div style="overflow-x: hidden;">
    <v-loading v-if="isLoading"></v-loading>
    <v-title-bar v-if="newsContent != null" :content="newsContent.image_source" :shareUrl="newsContent.share_url" :backFunc="clickBack"></v-title-bar>
    <!-- <v-content v-if="newsContent != null"> -->
      <div class="img_div" v-if="newsContent != null">
        <img :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+newsContent.image" alt="">
        <h3>{{newsContent.title}}</h3>
      </div>
      <div class="html_content" v-html="newsContent.body" v-if="newsContent != null">
      </div>
    <!-- </v-content> -->
    <v-iserror v-if="isError" :reload="getNewsById" :reloadParams="requestData"></v-iserror>
    <v-backtop></v-backtop>
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
      linkcss: null
    }
  },
  methods: {
    getNewsById(id) {
      this.isLoading = true;
      this.isError = false;
      let _this = this;
      api.getNewsById(id).then(function(data) {
        _this.newsContent = data.data;
        if (_this.newsContent.css.length != 0 && _this.newsContent.css[0] != null) {
          let _link = document.createElement("link");
          _link.setAttribute("rel", "stylesheet");
          _link.setAttribute("type", "text/css");
          _link.setAttribute("href", _this.newsContent.css[0]);
          _this.linkcss = _link;
          let _headTag = document.getElementsByTagName("head")[0];
          _headTag.appendChild(_link);
        }
        _this.isLoading = false;
        _this.newsContent.body = _this.newsContent.body.replace(/src=\"/g, "src=\"http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=");
      }, function() {
        _this.isLoading = false;
        _this.isError = true;
      })
    },
    clickBack(){
      let _headTag = document.getElementsByTagName("head")[0];
      _headTag.removeChild(this.linkcss);
      this.$router.go(-1);
    }
  },
  mounted() {
    let _this = this;
    this.requestData.id = this.$route.query.id;
    this.getNewsById(this.$route.query.id);
    // window.onscroll = function(){
    //   let _top = document.documentElement.scrollTop || document.body.scrollTop;
    //   _this.$store.commit("changeScrollTop",{
    //     _top:_top
    //   })
    // }
  },

}
</script>

<style lang="less">
.img_div {
    width: 100%;
    position: relative;
    img {
        width: 100%;
    }
    h3 {
      display:flex;
      justify-content: center;
      align-items: center;
      margin:0;
      position: absolute;
      bottom:0;
      padding:8px 5px 0;
      color:white;
      font-size:17px;
      font-family: "微软雅黑";
      width:100%;
      background:linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 95%);
      height: 46px;
      }
}
.content{
  font-size:16px !important;
}
.headline .img-place-holder {
    height: 0 !important;
}
</style>

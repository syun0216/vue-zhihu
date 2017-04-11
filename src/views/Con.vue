<template lang="html">
  <div class="">
    <v-loading v-if="isLoading"></v-loading>
    <v-title-bar v-if="newsContent != null" :content="topTitle" :shareUrl="newsContent.share_url"></v-title-bar>
    <v-content v-if="newsContent != null">
      <div class="img_div">
        <img :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+newsContent.image" alt="">
      </div>
      <div v-html="newsContent.body">
      </div>
    </v-content>
    <v-iserror v-if="isError" :reload="getNewsById" :reloadParams="requestData"></v-iserror>
  </div>
</template>

<script>
import api from './../api/index';
export default {
  data(){
    return {
      newsContent:null,
      topTitle:null,
      requestData:{id:null},
      isLoading:false,
      isError:false
    }
  },
  methods:{
    getNewsById(id){
      this.isLoading = true;
      this.isError = false;
      let _this = this;
      api.getNewsById(id).then(function(data){
        _this.newsContent = data.data;
        _this.isLoading = false;
        _this.newsContent.body = _this.newsContent.body.replace(/src=\"/g,"style=\"width:100%\" src=\"http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=");
        _this.topTitle = _this.newsContent.title.length > 10 ? _this.newsContent.title.substring(0,10)+"..." : _this.newsContent.title;
      },function(){
        _this.isLoading = false;
        _this.isError = true;
      })
    }
  },
  created(){
    this.requestData.id = this.$route.query.id;
    this.getNewsById(this.$route.query.id);
  }
}
</script>

<style lang="less">
  .img_div{
    width: 100%;
    img{
      width:100%;
    }
  }
</style>

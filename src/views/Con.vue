<template lang="html">
  <div class="">
    <v-loading v-if="newsContent==null"></v-loading>
    <v-title-bar v-if="newsContent != null" :content="topTitle" :shareUrl="newsContent.share_url"></v-title-bar>
    <v-content v-if="newsContent != null">
      <div class="img_div">
        <img :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+newsContent.image" alt="">
      </div>
      <div v-html="newsContent.body">
      </div>
    </v-content>
  </div>
</template>

<script>
import api from './../api/index';
export default {
  data(){
    return {
      newsContent:null,
      topTitle:null
    }
  },
  methods:{
    getNewsById(id){
      let _this = this;
      api.getNewsById(id).then(function(data){
        _this.newsContent = data.data;
        _this.topTitle = _this.newsContent.title.length > 10 ? _this.newsContent.title.substring(0,10)+"..." : _this.newsContent.title;
      })
    }
  },
  created(){
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

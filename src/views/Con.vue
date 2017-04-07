<template lang="html">
  <div class="">
    <v-loading v-if="newsContent==null"></v-loading>
    <v-title-bar :content="topTitle"></v-title-bar>
  </div>
</template>

<script>
import api from './../api/index';
export default {
  data(){
    return {
      _content:"新闻",
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

<style lang="css">
</style>

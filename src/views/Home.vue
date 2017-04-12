<template lang="html">
  <div>
    <v-loading v-if="isLoading"></v-loading>
    <v-swiper v-if="newsData!=null" :swiperData="newsData.top_stories"></v-swiper>
    <div v-if="newsData != null">
        <cell :title="newsData.date.substring(0,4)+'/'+newsData.date.substring(4,6)+'/'+newsData.date.substring(6,8)"></cell>
      <group style="margin-top:0px" v-for='item in newsData.stories' v-bind:data="item" v-bind:key="item.id">
          <cell :title="item.title" @click.native="onClick(item.id)">
            <img slot="icon" width="80" style="display:block;margin-right:5px;" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.images[0]" />
          </cell>
      </group>
    </div>
    <infinite-scroll :scroller="scroller" :loading="bottomLoading" v-on:load="loadMore" />
    <v-iserror v-if="isError" :reload="getNews"></v-iserror>
  </div>
</template>

<script>
import api from './../api/index'
import {
  Cell,
  Group
} from 'vux';
export default {
  data() {
    return {
      newsData: null,
      isLoading:false,
      bottomLoading:false,
      bottomLoadingText:"正在加载中...",
      isError:false,
      count:1,
      scroller:null
    }
  },
  components: {
    Cell,
    Group
  },
  methods: {
    getNews(type) {
      this.isLoading = true;
      this.isError = false;
      let _this = this;
      if(type){
        api.getNews().then(function(data) {
          _this.newsData = data.data;
          _this.isLoading = false;
        },function(){
          _this.isLoading = false;
          _this.isError = true;
        })
      }
      else{
        api.getNewsByDate(_this.getDate(_this.count)).then(function(data){
          console.log(data);
          _this.bottomLoading = false;
        },function(){
          _this.bottomLoadingText = "加载失败...";
          _this.bottomLoading = false;
        })
      }
    },
    onClick(id) {
      this.$router.push({
        path: 'con',
        query: {
          id: id || ""
        }
      });
    },
    loadMore(){
      console.log("It works!")
      this.bottomLoading = true;
      this.count ++;
      let _this = this;
      setTimeout(function(){
        _this.getNews();
      },500);
    },
    getDate(count){
      var _date = new Date();
      _data.setDate(_date.getDate() - count);
      let _year = _date.getFullYear();
      let _month = _date.getMonth() + 1;
      let _day = _date.getDate() + 1;
      return [_year,_month,_day].join("");
    }
  },
  mounted() {
    this.getNews(1);
    this.scroller = this.$el;
  }
}
</script>

<style lang="less">
.vux-no-group-title{
  margin-top:0 !important;
}
</style>

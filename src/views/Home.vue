<template lang="html">
  <div>
    <v-iserror v-if="isError" :reload="getNews"></v-iserror>
    <v-loading v-if="isLoading"></v-loading>
    <v-swiper v-if="newsData!=null" auto :swiperData="newsData[0].top_stories"></v-swiper>
    <div v-if="newsData != null" v-for="nItem in newsData">
      <div class="time_tips">
        {{nItem.date.substring(0,4)+'年'+nItem.date.substring(4,6)+'月'+nItem.date.substring(6,8)+'日'}}
      </div>
        <!-- <cell :title="nItem.date.substring(0,4)+'/'+nItem.date.substring(4,6)+'/'+nItem.date.substring(6,8)"></cell> -->
      <group style="margin-top:0px" v-for='item in nItem.stories' v-bind:data="item" v-bind:key="item.id">
          <cell :title="item.title" @click.native="onClick(item.id)">
            <img slot="icon" width="80" style="display:block;margin-right:5px;" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.images[0]" />
          </cell>
      </group>
    </div>
    <v-backtop></v-backtop>
    <infinite-loading spinner="waveDots" v-if="newsData != null && !bottomLoadingError" :on-infinite="loadMore" ref="infiniteLoading">
    </infinite-loading>
    <v-bottomloadingerror :isShow="bottomLoadingError" :reload="_bottomLoadingError"></v-bottomloadingerror>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
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
      bottomLoadingError:false,
      isError:false,
      count:1,
      scroller:null
    }
  },
  components: {
    Cell,
    Group,
    InfiniteLoading
  },
  methods: {
    getNews(type) {
      this.isError = false;
      let _this = this;
      if(type){
        this.isLoading = true;
        api.getNews().then(function(data) {
          _this.newsData = [];
          _this.newsData.push(data.data);
          _this.isLoading = false;
        },function(){
          _this.isLoading = false;
          _this.isError = true;
        })
      }
      else{
        api.getNewsByDate(_this.getDate(_this.count)).then(function(data){
          _this.newsData.push(data.data);
          _this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        },function(){
          _this.count --;
          _this.bottomLoadingError = true;
          _this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
      })
    }},
    onClick(id) {
      this.$router.push({
        path: 'con',
        query: {
          id: id || ""
        }
      });
    },
    loadMore(){
      this.bottomLoading = true;
      this.bottomLoadingError = false;
      this.count ++;
      let _this = this;
      setTimeout(function(){
        _this.getNews();
      },500);
    },
    getDate(count){
      var _date = new Date();
      _date.setDate(_date.getDate() + 1 - count);
      let _year = _date.getFullYear();
      let _month = (_date.getMonth() + 1) < 10 ? "0" +(_date.getMonth() + 1) : _date.getDate() + 1;
      let _day = (_date.getDate() + 1) < 10 ? "0"+(_date.getDate() + 1) : _date.getDate() + 1;
      return [_year,_month,_day].join("");
    },
    _bottomLoadingError(){
      this.bottomLoadingError = false;
    },
    getScoller(){
      console.log(this.$el.scrollTop);
    }
  },
  watch:{
    'scoller':'getScoller'
  },
  mounted() {
    this.getNews(1);
    this.scroller = this.$el.scrollTop;
  }
}
</script>

<style lang="less">
.vux-no-group-title{
  margin-top:0 !important;
}
.time_tips{
  padding:5px 0;
  text-align: center;
  background: rgba(93, 93, 84, 0.75);
  color:white;
}
.vux-swiper-desc{
  padding: 20px 50px 32px 13px !important;
}
</style>

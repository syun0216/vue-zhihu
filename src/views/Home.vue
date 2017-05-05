<template lang="html">
  <div>
    <v-iserror v-if="isError" :reload="getNews"></v-iserror>
    <v-loading v-if="isLoading"></v-loading>
    <v-swiper v-if="newsData!=null" auto :swiperData="newsData[0].top_stories"></v-swiper>
    <div v-if="newsData != null" v-for="nItem in newsData">
      <div class="time_tips">
        {{nItem.date.substring(0,4)+'年'+nItem.date.substring(4,6)+'月'+nItem.date.substring(6,8)+'日'}}
        <span style="margin-left:5px;">{{nItem.weekday}}</span>
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
          data.data.weekday = _this.setWeekDay(data.data.date);
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
          data.data.weekday = _this.setWeekDay(data.data.date);
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
        path: 'content',
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
    setWeekDay(_date){
      let _newdate = _date.substring(0,4)+"/"+_date.substring(4,6)+"/"+
      _date.substring(6,8);
      let _day = new Date(_newdate).getDay();
      switch(_day){
        case 0 :return "星期日";break;
        case 1 :return "星期一";break;
        case 2 :return "星期二";break;
        case 3 :return "星期三";break;
        case 4 :return "星期四";break;
        case 5 :return "星期五";break;
        case 6 :return "星期六";break;
      }
    }
  },
  mounted() {
    if(this.newsData === null) {
      this.getNews(1);
    }
    this.$store.commit("changeShowSlideBar", {
      isShow: true
  })
  },

}
</script>

<style lang="less">
.vux-no-group-title{
  margin-top:0 !important;
}
.time_tips{
  padding:5px 0;
  text-align: center;
  background: rgba(34, 34, 34, 1);
  color:white;
}
.vux-swiper-desc{
  padding: 20px 50px 32px 13px !important;
}
</style>

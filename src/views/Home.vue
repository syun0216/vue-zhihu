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
    <v-iserror v-if="isError" :reload="getNews"></v-iserror>
  </div>
</template>

<script>
import api from './../api/index';
import {
  Cell,
  Group
} from 'vux';
export default {
  data() {
    return {
      newsData: null,
      isLoading:false,
      isError:false
    }
  },
  components: {
    Cell,
    Group
  },
  methods: {
    getNews() {
      this.isLoading = true;
      this.isError = false;
      let _this = this;
      api.getNews().then(function(data) {
        _this.newsData = data.data;
        _this.isLoading = false;
      },function(){
        _this.isLoading = false;
        _this.isError = true;
      })
    },
    onClick(id) {
      this.$router.push({
        path: 'con',
        query: {
          id: id || ""
        }
      });
    }
  },
  beforeMount() {
    this.getNews();
  }
}
</script>

<style lang="less">
.vux-no-group-title{
  margin-top:0 !important;
}
</style>

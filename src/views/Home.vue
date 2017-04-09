<template lang="html">
  <div class="">
    <v-loading v-if='newsData== null'></v-loading>
    <v-swiper v-if="newsData!=null" :swiperData="newsData.top_stories"></v-swiper>
    <v-confirm></v-confirm>
    <div v-if="newsData != null">
      <group v-for='item in newsData.stories' v-bind:data="item" v-bind:key="item.id">
          <cell :title="item.title" @click.native="onClick(item.id)">
            <img slot="icon" width="80" style="display:block;margin-right:5px;" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.images[0]" />
          </cell>
      </group>
    </div>
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
      newsData: null
    }
  },
  components: {
    Cell,
    Group
  },
  methods: {
    getNews() {
      let _this = this;
      api.getNews().then(function(data) {
        _this.newsData = data.data;

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
</style>

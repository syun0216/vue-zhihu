<template lang="html">
  <div class="">
    <transition name="slide-fade">
        <v-loading v-if='newsData== null'></v-loading>
    </transition>
    <v-swiper :swiperData="newsData.top_stories"></v-swiper>
    <!-- <div class="list" v-if="newsData != null">
      <p class="list-time">{{newsData.date}}</p>
      <div class="list-con" v-for='sItem in newsData.top_stories'>
        <img :src="sItem.images[0]" alt="加载图片" />
        <p>{{sItem.title}}</p>
      </div>
    </div> -->
    <group v-for='item in newsData.stories' v-if='newsData != null'>
        <cell :title="item.title" @click.native="onClick(item.id)">
          <!-- <img slot="icon" width="80" style="display:block;margin-right:5px;" :src="item.images[0]" /> -->
        </cell>
    </group>
  </div>
</template>

<script>
import api from './../api/index';
import {Cell,Group,XImg} from 'vux';
export default {
  data(){
    return {
      newsData:null
    }
  },
  components:{
    Cell,
    Group
  },
  methods:{
    getNews(){
      let _this = this;
      api.getNews().then(function(data){
        _this.newsData = data.data;

      })
    },
    onClick(id){
      this.$router.push({
				path: 'con',
				query: {
					id: id || ""
				}
			});
    }
  },
  created(){
    this.getNews();
  }
}
</script>

<style lang="less">

</style>

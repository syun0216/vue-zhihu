<template lang="html">
  <div class="">
    <v-swiper></v-swiper>
    <group v-for='item in newsData' v-if='newsData != null'>
        <cell :title="item.title" @click.native="onClick(item.id)"></cell
        <image src='item.images[0]'/>
    </group>
  </div>
</template>

<script>
import api from './../api/index';
import {Cell,Group} from 'vux';
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
        _this.newsData = data.data.stories;
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

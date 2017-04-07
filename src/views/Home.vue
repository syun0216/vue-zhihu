<template lang="html">
  <div class="">
    <transition name="slide-fade">
        <v-loading v-if='newsData== null'></v-loading>
    </transition>
    <v-swiper></v-swiper>
    <!-- <div class="list" v-if="newsData != null">
      <p class="list-time">{{newsData.date}}</p>
      <div class="list-con" v-for='sItem in newsData.top_stories'>
        <img :src="sItem.images[0]" alt="加载图片" />
        <p>{{sItem.title}}</p>
      </div>
    </div> -->
    <group v-for='item in newsData' v-if='newsData != null'>
        <cell :title="item.title" @click.native="onClick(item.id)">
          <img slot="icon" width="80" style="display:block;margin-right:5px;" :src="item.images[0]">
        </cell>
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
@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;
.list {
    width: 90%;
    z-index: 1;
    position: relative;
    padding-top: 0.8rem;
    margin: .8rem auto 0;
    &-time {
        top: 0;
        margin: 0;
        color: #fff;
        padding: 0 1rem;
        font-size: 0.4rem;
        line-height: 0.8rem;
        letter-spacing: 0.1rem;
        border-radius: 0.4rem;
        text-align: center;
        background-color: @yellow;
        transform: translate(0,-50%);
        position: absolute;
        box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);
    }
    &-con {
	cursor: pointer;
        display: flex;
        padding: 0.3rem;
        margin-bottom: 0.4rem;
        border-radius: 0.15rem;
        align-items: center;
        background-color: #fff;
        box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);
        img {
            width: 2rem;
            margin-right: 0.4rem;
        }
        p {
            color: @blue;
            font-size: 0.4rem;
            text-align: justify;
            margin: 0;
        }
    }
}
</style>

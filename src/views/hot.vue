<template lang="html">
  <div>
    <v-loading v-if="isLoading"></v-loading>
    <v-toast v-if="hotData!== null" :tips="tips"></v-toast>
    <v-toast v-if="isError" :tips="tips"></v-toast>
    <v-iserror v-if="isError" :reload="_getHotNews"></v-iserror>
    <!-- hotnews -->
    <div class="hot_title_img" v-if="hotData !== null">
      <p><span style="font-size:0.6em">最热的讨论都在这里啦~</span></p>
    </div>
    <div v-if="!isError  && hotData !== null">
      <group v-if="hotData != null" v-for='item in hotData.recent' v-bind:data="item" v-bind:key="item.news_id">
        <cell :title="item.title" @click.native="onClick(item.news_id)">
          <img v-if="typeof item.thumbnail != 'undefined'" slot="icon" width="80" style="display:block;margin-right:5px;" :src="item.thumbnail" />
        </cell>
      </group>
    </div>
    <!-- hotnews -->
    <v-backtop></v-backtop>
  </div>
</template>

<script>
import api from '../api/index'
import {
  Cell,
  Group
} from 'vux';
export default {
  data(){
    return{
      isLoading:null,
      isError:false,
      hotData:null,
      tips:null
    }
  },
  components:{
    Cell,
    Group
  },
  methods:{
    _getHotNews(){
      this.isLoading = true;
      api.getHotNews().then((data) => {
        this.isLoading = false;
        this.hotData = data.data;
        this.isError = false;
        this.tips = "加载成功";
      },() => {
        this.tips = "加载失败";
        this.isLoading = false;
        this.isError = true;
      })
    },
    onClick(id) {
      this.$router.push({
        path: 'content',
        query: {
          id: id || ""
        }
      });
    }
  },
  mounted(){
    this._getHotNews();
  }
}
</script>

<style lang="less">
.hot_title_img{
  width:100%;
  position:relative;
  height: 180px;
  background-image: url("https://static.vux.li/demo/1.jpg");
  background-size: cover;
  background-position: 22px;
  img{
    width:100%;
  }
  p{
    position: absolute;
    width:100%;
    text-align: right;
    margin: 0;
    bottom:-1px;
    background: transparent;
    right:5px;
    font-size:1.5em;
    background: transparent;
    color:white;
    padding-bottom: 5px;
    span{
      margin-right: 10px;
    }
  }
}
</style>

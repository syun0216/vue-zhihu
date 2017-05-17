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
  height: 100px;
  background:#723e36;
  img{
    width:100%;
  }
  p{
    position: absolute;
    width:100%;
    text-align: right;
    margin: 0;
    bottom:0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.00) 5%, rgba(0,0,0,0.8) 95%);
    font-size:1.5em;
    color:white;
    padding-bottom: 5px;
    height:42px;
    span{
      margin-right: 10px;
    }
  }
}
</style>

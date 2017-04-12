<template lang="html">
  <div>
    <v-iserror v-if="isError" :reload="_getThemeById" :reloadParams="requestData"></v-iserror>
    <v-loading v-if="isLoading"></v-loading>
    <div class="titleImg" v-if="themeData != null">
      <img :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+themeData.background" alt="">
      <p><span>{{themeData.name}}</span></br><span style="font-size:0.6em">{{themeData.description.substring(0,20)+"..."}}</span></p>
    </div>

    <cell :title="'作者：'+themeData.editors[0].name" v-if="themeData != null">
      <img slot="icon" width="80" style="display:block;margin-right:5px;" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+themeData.editors[0].avatar" />
    </cell>
    <div v-if="themeData != null">
      <group v-if="themeData != null" v-for='item in themeData.stories' v-bind:data="item" v-bind:key="item.id">
        <cell :title="item.title" @click.native="onClick(item.id)">
          <!-- <img slot="icon" width="80" style="display:block;margin-right:5px;" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.images[0]" /> -->
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
import api from "./../api/index"
import {
  Cell,
  Group
} from 'vux';
export default {
  data(){
    return {
      isError:false,
      isLoading:false,
      requestData:{id:null},
      themeData:null
    }
  },
  methods:{
    _getThemeById(){
      let _this = this;
      this.isLoading = true;
      api.getTopicsById(this.$route.query.id).then(function(data){
        _this.isLoading = false;
        _this.themeData = data.data;
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
  components:{
    Cell,
    Group
  },
  mounted(){
    this.requestData.id = this.$route.query.id;
    this._getThemeById(this.$route.query.id);
  }
}
</script>

<style lang="less">
.titleImg{
  width:100%;
  height:270px;
  position:relative;
  img{
    width:100%;
  }
  p{
    position: absolute;
    width:100%;
    text-align: right;
    margin: 0;
    bottom:0;
    right:0;
    font-size:1.5em;
    background-image: linear-gradient(0deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.6) 95%);
    color:white;
    span{
      margin-right: 10px;
    }
  }
}
.vux-no-group-title{
  margin-top:0 !important;
}
</style>

<template lang="html">
  <div>
    <v-iserror v-if="isError" :reload="_getThemeById" :reloadParams="requestData"></v-iserror>
    <v-loading v-if="isLoading"></v-loading>
    <div class="titleImg" v-if="themeData != null">
      <img :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+themeData.background" alt="">
      <p><span>{{themeData.name}}</span><br><span style="font-size:0.6em">{{themeData.description.substring(0,20)+"..."}}</span></p>
    </div>
    <div class="_author" v-if="themeData!= null">
      <span>主编</span>
      <img :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+themeData.editors[0].avatar" alt="author" />
      <span>{{themeData.editors[0].name}}</span>
    </div>
    <div v-if="themeData != null">
      <group v-if="themeData != null" v-for='item in themeData.stories' v-bind:data="item" v-bind:key="item.id">
        <cell :title="item.title" @click.native="onClick(item.id)">
          <img v-if="typeof item.images != 'undefined'" slot="icon" width="80" style="display:block;margin-right:5px;" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='+item.images[0]" />
        </cell>
      </group>
    </div>
    <v-backtop></v-backtop>
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
  watch:{
      '$route'(to,from){
        if(to.query.id != from.query.id){
            this._getThemeById(to.query.id);
        }
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
    background: linear-gradient(to bottom, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.8) 95%);
    color:white;
    span{
      margin-right: 10px;
    }
  }
}
._author{
  text-align: left;
  padding:10px 0 10px 5%;
  background: linear-gradient(to top,#959595,rgba(0,0,0,0.9) 95%) ;
  color:white;
  img{
    width:20px;
    height:20px;
    border-radius: 50%;
    vertical-align: sub;
    margin:0 10px 0 20px;
  }
}
.weui-cell{
  padding:0 !important;
}
.vux-no-group-title{
  font-size:14px;
  text-align: left;
}
.vux-label{
  margin:0 4px 0 7px;
}
</style>

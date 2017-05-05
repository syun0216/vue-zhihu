<template lang="html">
  <div>
    <v-iserror v-if="isError" :reload="_getThemeById" :reloadParams="requestData"></v-iserror>
    <v-loading v-if="isLoading"></v-loading>
    <div class="titleImg" v-if="themeData != null">
      <img :src="themeData.background" alt="">
      <p><span>{{themeData.name}}</span><br><span style="font-size:0.6em">{{themeData.description.length>=20 ? themeData.description.substring(0,20)+"..." : themeData.description}}</span></p>
    </div>
    <div class="_author" v-if="themeData!= null" >
      <span>主编</span>
      <div v-for="author in themeData.editors" style="display: inline-block">
      <img :src="author.avatar" alt="author" />
      <!--<span>{{author.name}}</span>-->
      </div>
    </div>
    <div v-if="themeData != null">
      <group v-if="themeData != null" v-for='item in themeData.stories' v-bind:data="item" v-bind:key="item.id">
        <cell :title="item.title" @click.native="onClick(item.id)">
          <img v-if="typeof item.images != 'undefined'" slot="icon" width="80" style="display:block;margin-right:5px;" :src="item.images[0]" />
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
        _this.isError = false;
      },function(){
        _this.isLoading = false;
        _this.isError = true;
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
    if(this.themeData === null){
      this._getThemeById(this.$route.query.id);
    }
    this.$store.commit("changeShowSlideBar",{
      isShow:true
    })
  }
}
</script>

<style lang="less">
.titleImg{
  width:100%;
  /*height:270px;*/
  position:relative;
  img{
    width:100%;
  }
  p{
    position: absolute;
    width:100%;
    text-align: right;
    margin: 0;
    bottom:5px;
    right:0;
    font-size:1.5em;
    background: linear-gradient(to bottom, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.8) 95%);
    color:white;
    padding-bottom: 5px;
    span{
      margin-right: 10px;
    }
  }
}
._author{
  text-align: left;
  padding:10px 0 10px 5%;
  background: white;
  margin-top: -4px;
  color:#222;
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

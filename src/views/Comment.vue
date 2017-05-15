<template lang="html">
  <div style="overflow-x: hidden">
      <v-loading v-if="shortComments === null || longComments === null"></v-loading>
      <v-title-bar v-if="shortComments !== null || longComments !== null"  :content="comments"></v-title-bar>
      <div class="comment-title" style="margin-top:50px;" v-if="longComments !== null">
          {{longComments.length}}条长评
      </div>
      <div class="comment-content" v-for="item in longComments" v-if="longComments !== null">
          <div class="author-comment"><img :src="item.avatar" alt="a"></div>
          <div>
            <h5>{{item.author}} <span>{{item.likes}}</span><img src="../assets/new/like.png" alt="a"></h5>
            <p style="margin-top:10px;">{{item.content}}</p>
            <p>{{item.time}}</p>
          </div>
      </div>
      <div id="s-title" class="comment-title" style="margin-top:10px;" v-if="shortComments !== null">
         <span>{{shortComments.length}}条最新短评</span>
          <img src="../assets/new/doubledown.png" alt="doubledown" @click="showShortComments">
      </div>
      <div class="comment-content" v-for="item in shortComments" v-if="shortComments !== null && isShowShort">
          <div class="author-comment"><img :src="item.avatar" alt="a"></div>
          <div>
            <h5>{{item.author}} <span>{{item.likes}}</span><img src="../assets/new/like.png" alt="a"></h5>
            <p style="margin-top:10px;">{{item.content}}</p>
            <p>{{item.time}}</p>
          </div>
      </div>
  </div>
</template>

<script>
  import api from './../api/index'
export default {
    data(){
      return{
        longComments:null,
        shortComments:null,
        comments:null,
        isShowShort:false,
        imgSrc:"../assets/new/doubledown.png"
      }
    },
    methods:{
        getLongComment(id){
            api.getLongComments(id).then((data) => {
                this.longComments = data.data.comments;
                this.longComments = this.getLocalDate(this.longComments);
            },() => {

            })
        },
        getShortComment(id){
            api.getShortComments(id).then((data) => {
                this.shortComments = data.data.comments;
                this.shortComments = this.getLocalDate(this.shortComments);
            },() => {

            })
        },
      getLocalDate(ns){
            ns.map((val,idx) => {
               val.time =  new Date(parseInt(val.time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            });
            return ns;
    },
      showShortComments(){
          this.isShowShort = ! this.isShowShort;
          this.imgSrc = "../assets/new/doubleup.png";
          let _top = document.documentElement.scrollTop || document.body.scrollTop;
          let __top = document.getElementById('s-title').offsetTop - 50;
          let timer = setInterval(()=>{
              if(_top < __top){
                  _top += 10;
                  window.scrollTo(0,_top);
              }
              else{
                  window.scrollTo(_top,__top);
                clearInterval(timer);
              }
          },10);
      }
    },
    mounted(){
        this.comments = this.$route.query.comments + "  条点评";
        this.getLongComment(this.$route.query.id);
        this.getShortComment(this.$route.query.id);
  }
}
</script>

<style lang="less">
  .comment-title{
    height:40px;
    width: 100%;
    border-bottom:1px solid #ccc;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left:15px;
    letter-spacing: 3px;
    font-weight: bold;
    position: relative;
    img{
      width: 22px;
      position: absolute;
      right: 31px;
    }
  }
  .comment-content{
    position: relative;
    padding:15px;
    overflow: hidden;
    /*border-top:1px solid #ccc;*/
    border-bottom:1px solid #ccc;
    .author-comment{
      position: absolute;
      width: 10%;
      /*height: 100px;*/
      margin-right:10px;
      img{
        width: 32px;
        border:1px solid #ccc;
        border-radius: 50px;
      }
    }
    :last-child{
      width: 85%;
      float: right;
      h5{
        margin: 0;
        text-align: left;
        font-size:16px;
        img{
          float: right;
          width: 22px;
          margin-top:-4px;
        }
        span{
          float: right;
          color:#ccc;
          margin-left:5px;
        }
      }
      p{
        text-align: left;
        width: 100%;
        margin: 0;
        &:last-child{
          margin-top:10px;
          color:#ccc;
        }
      }
      /*float: left;*/
      /*height: 100px;*/
    }
  }
</style>

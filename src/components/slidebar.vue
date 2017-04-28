<template lang="html">
  <div>
    <div class="header">
      <img src="./../assets/menu.png" alt="菜单按钮" @click="toggle()">
      <p class="p_title">{{titleName}}</p>
    </div>
    <div class="aside" :class="{open:open,docked:docked}" @click="toggle()" v-if="themeData != null">
      <ul>
        <li :class="{active:num == 1}" @click="changeTheme(1)">首页 <img v-if="num == 1" src="./../assets/check.png" alt="check"></li>
        <li :class="{active:num == index+2}" v-for="(item,index) in themeData" @click="changeTheme(index+2,item)">{{item.name}}<img v-if="num == index + 2" src="./../assets/check.png" alt="check"></li>
        <li @click="goGithub()"><img src="./../assets/github.png" alt="github"><div>syun0216</div></li>
      </ul>
    </div>
  </div>

</template>

<script>
import api from "./../api/index"
export default {
  data(){
    return {
      open:false,
      docked:false,
      themeData:null,
      num:1,
      titleName:"今日热闻"
    }
  },
  methods:{
    toggle(){
      if(!this.open){
        this.docked = true;
        this.open = true;
      }else{
        let _this = this;
        this.open = false;
        setTimeout(function(){
          _this.docked = false;
        },500)
      }
    },
    getNewsTopic(){
      let _this = this;
      api.getTopics().then(function(data){
        _this.themeData = data.data.others;
      },function(){

      })
    },
    changeTheme(num,data){
      this.num = num;
      this.titleName = typeof data === 'undefined' ? "今日热闻" : data.name;
      let _path = num == 1 ? {path:"home"} : {path:"theme",query:{id:data.id || ""}};
      this.$router.push(_path);
    },
    goGithub(){
      window.open("https://github.com/syun0216/vue-zhihu");
    }
  },
  mounted(){
    this.getNewsTopic();
  }
}
</script>

<style lang="less">
  .active{
      color:yellow !important;
  }
  .header{
    width:100%;
    height:2.8rem;
    z-index:9;
    position: fixed;
    top:0;
    background: linear-gradient(0deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.6) 95%);
     img{
      width:1.5rem;
      position: absolute;
      top:20%;
      left: 5%;
    }
    .p_title{
      text-align: center;
      color:white;
      margin: 9px;
    }
  }
  .aside{
    position: fixed;
    z-index:11;
    top:0;
    left:0;
    right:0;
    visibility: hidden;
    width:100%;
    height:100%;
    &::-webkit-scrollbar {
        display: none!important;
        width: 0!important;
        height: 0!important;
        -webkit-appearance: none;
        opacity: 0!important;
    }
    ul{
      margin:0;
      float: left;
      width:50%;
      height: 100%;
      overflow: auto;
      padding: 1.3rem 0.5rem 0.5rem;
      background:rgba(93, 93, 84, 0.75);
      transform: translate(-100%,0);
      transition: transform 0.3s ease;
      -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none!important;
            width: 0!important;
            height: 0!important;
            -webkit-appearance: none;
            opacity: 0!important;
        }
        li{
          cursor:pointer;
          font-size:0.80rem;
          font-weight: bold;
          list-style: none;
          color:#fff;
          margin: 13% 9px;
          padding-bottom:2px;
          width:140px;
          text-align: left;
          .iconfont {
            float: right;
            font-size: 0.6rem;
        }
          &.chose {
            color: #FFD300;
        }
        img{
          width:20px;
          height:20px;
          float: right;
        }
        div{
          display: inline-block;
          margin-top: 3px;
        }
        }
    }
    .cover {
        width: 100%;
        height: 100%;
        opacity: 0;
        display: none;
        background: rgba(172,185,201,0.40);
        transition: opacity 0.3s ease;
    }
    &.open {
        ul {
            transform: translate(0);
        }
        .cover {
            opacity: 1;
        }
    }
    &.docked {
        visibility: visible;
        .cover {
            display: block;
        }
    }
  }
</style>

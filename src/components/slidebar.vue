<template lang="html">
  <div>
    <div id="header">
      <img src="./../assets/menu.png" alt="菜单按钮" @click="toggle()">
      <p class="p_title">{{titleName}}</p>
    </div>
    <div class="aside" :class="{open:open,docked:docked}" @click="toggle()" v-if="themeData != null">
      <ul>
        <li :class="{active:num == 1}" @click="changeTheme(1)">首页 <img v-if="num == 1" src="./../assets/check.png" alt="check"></li>
        <li :class="{active:num == 14}" @click="changeTheme(14)">最热讨论 <img v-if='num === 14' src="./../assets/check.png" alt="check"></li>
        <li :class="{active:num == index+2}" v-for="(item,index) in themeData" @click="changeTheme(index+2,item)">{{item.name}}<img v-if="num == index + 2" src="./../assets/check.png" alt="check"></li>
        <li @click="goGithub()"><img src="./../assets/github.png" alt="github"><div>syun0216</div></li>
      </ul>
    </div>
  </div>

</template>

<script>
import api from "./../api/index"
import {mapState} from 'vuex'
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
      let _app = document.getElementById('app');
      if(!this.open){
        _app.classList.add('overflow-hidden');
        this.docked = true;
        this.open = true;
      }else{
        _app.classList.remove('overflow-hidden');
        this.open = false;
        setTimeout(() => {
          this.docked = false;
        },500);
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
      if(typeof data === 'undefined'){
        this.titleName = num === 1 ? "今日热闻" : "最热讨论";
      }
      else{
        this.titleName = data.name;
      }
      document.getElementsByClassName("p_title")[0].innerHTML = this.titleName;
      this.$store.commit('changeSelectedName',{
          name:this.titleName
      });
      this.$store.commit('changeSelectedNum',{
          num:this.num
      });
      let _path = num === 1 ? {path:"home"} : num === 14 ? {path:"hot"} : {path:"theme",query:{id:data.id || ""}};
      this.$router.push(_path);
    },
    goGithub(){
      window.open("https://github.com/syun0216/vue-zhihu");
    }
  },
  mounted(){
    this.getNewsTopic();
    this.titleName = this.selectedName !== null ? this.selectedName : "今日热闻";
    this.num = this.selectedNum !== null ? this.selectedNum : 1;
  },
  computed:{
    ...mapState({
      selectedName:state => state.selectedName,
      selectedNum:state => state.selectedNum,
      scrollerTop:state => state.scrollerTop
    })
  },
  watch:{
    scrollerTop(){
      let _top = this.scrollerTop;
      let _dom = document.getElementById("header");
      if(this.$route.name === 'home' || this.$route.name === 'hot'){
        if(_top <= 180){
          let _opacity = _top/180;
          _dom.style.background = `rgba(30, 144, 255, ${_opacity})`;
        }
      }
      else if(this.$route.name === 'theme'){
        if(_top <= 280){
          let _opacity = _top/280;
          _dom.style.background = `rgba(30, 144, 255, ${_opacity})`;
        }
      }
    }
  },
}
</script>

<style lang="less">
  .active{
      color:yellow !important;
  }
  #header{
    width:100%;
    height:50px;
    z-index:9;
    position: fixed;
    top:0;
     img{
      width:1.5rem;
      position: absolute;
      top:22%;
      left: 5%;
    }
    .p_title{
      text-align: center;
      color:white;
      margin: 11px;
      font-weight: bold;
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
      padding: 0.5rem 0.5rem 0.5rem;
      background:#222;
      opacity: 0.8;
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
          margin: 11% 9px;
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
          &:first-child{
              width:20px;
              height:20px;
              margin-right:5px;
              vertical-align: -4px;
          }
          &:last-child{
            width:20px;
            height:20px;
            float: right;
            vertical-align: -4px;
          }
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
  .overflow-hidden{
    overflow: hidden;
    width:100vw;
    height: 100vh;
    position:absolute;
  }
</style>

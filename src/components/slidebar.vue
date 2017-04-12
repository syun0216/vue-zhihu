<template lang="html">
  <div>
    <div class="header">
      <img src="./../assets/menu.png" alt="菜单按钮" @click="toggle()">
    </div>
    <div class="aside" :class="{open:open,docked:docked}" @click="toggle()" v-if="themeData != null">
      <ul>
        <li :class="{active:num == 1}" @click="changeTheme(1)">首页</li>
        <li :class="{active:num == index+2}" v-for="(item,index) in themeData" @click="changeTheme(index+2,item.id)">{{item.name}}</li>
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
      num:null
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
        })
      }
    },
    getNewsTopic(){
      let _this = this;
      api.getTopics().then(function(data){
        _this.themeData = data.data.others;
      },function(){

      })
    },
    changeTheme(num,id){
      this.num = num;
      let _path = num == 1 ? {path:"home"} : {path:"theme",query:{id:id || ""}};
      this.$router.push(_path);
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
      border-bottom:2px solid yellow;
  }
  .header{
    width:100%;
    height:2.8rem;
    z-index:9;
    padding-left:5%;
    position: fixed;
    top:0;
    background-image: linear-gradient(0deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.6) 95%);
     img{
      width:1.5rem;
      position: absolute;
      top:20%;
      left: 5%;
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
      width:60%;
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
          margin: 17px 56px;
          padding-bottom:2px;
          .iconfont {
            float: right;
            font-size: 0.6rem;
        }
          &.chose {
            color: #FFD300;
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

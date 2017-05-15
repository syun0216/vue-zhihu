<template lang="html">
  <div class="comments" style="overflow-x:hidden ">
    <ul>
      <li @click="goBack()"><img src="../assets/new/back.png" alt=""></li>
      <li @click="goShare()"><img src="../assets/new/share.png" alt=""></li>
      <li @click="goLike()">
        <img src="../assets/new/like.png" alt="">
        <span class="count">{{data.data.popularity}}</span>
      </li>
      <li @click="goComments()">
        <img src="../assets/new/comment.png" alt="">
        <span class="count-plus">{{data.data.comments}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      default:null,
      type:Object
    },
    backFunc:{
      default:null,
      type:Function
    },
    shareUrl:{
      type:String,
      default:null
    }
  },
  methods:{
    goBack(){
      if(this.$props.backFunc == null){
        this.$router.go(-1);
      }
      else{
        this.$props.backFunc();
      }
    },
  goShare(){
    if(this.shareUrl){
      window.open(this.shareUrl);
    }
  },
    goLike(){
      this.$emit('goLike',this.goLike);
    },
    goComments(){
        this.$emit('goComments',this.goComments);
    }
  }
}
</script>

<style lang="less">
.comments{
  position: fixed;
  bottom:0;
  left: 0;
  width:100%;
  height:50px;
  background:white;
  z-index: 100;
  border-top:1px solid #ccc;
  ul{
    margin:0;
    padding:0;
    list-style-type: none;
    height:50px;
    display: flex;
    align-items: center;
    justify-content: center;
    li{
      flex:1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      img{
        width:30px;
      }
      &:nth-child(3){
        position:relative;
        img{
          margin-top:-2px;
        }
      }
      &:last-child{
        position: relative;
      }
    }
  }
}
.count{
  position:absolute;
  top:3px;
  right:10px;
  color:#959595;
  font-size:13px;
}
.count-plus{
  position: absolute;
  top: 3px;
  right: 10px;
  color: white;
  background: #1e90ff;
  font-size: 13px;
  /*width: 10px;*/
  width: 26px;
  height: 17px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

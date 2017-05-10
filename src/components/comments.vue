<template lang="html">
  <div class="comments">
    <ul>
      <li><img src="../assets/new/back.png" alt=""></li>
      <li><img src="../assets/new/share.png" alt=""></li>
      <li>
        <img src="../assets/new/like.png" alt="">
        <span class="count">47</span>
      </li>
      <li>
        <img src="../assets/new/comment.png" alt="">
        <span class="count-plus">14</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){

  },
  props:{

  }
}
</script>

<style lang="less">
.comments{
  position: fixed;
  bottom:0;
  left: 0;
  width:100%;
  height:40px;
  background:white;
  z-index: 100;
  border-top:1px solid #ccc;
  ul{
    margin:0;
    padding:0;
    list-style-type: none;
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
  width: 10p;
  width: 26px;
  height: 17px;
}
</style>

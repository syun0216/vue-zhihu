<template>
  <span id="back-top" @click="scroller">
    <img src="../assets/back-top.png" alt="back to top"/>
  </span>
</template>

<script>
//todo:修改频繁commit store操作
  export default{
    methods: {
      scroller(){
        let timer = setInterval(function () {
          let _top = document.documentElement.scrollTop || document.body.scrollTop;
          if (_top > 0 && _top <= 1600) {
            _top -= 30;
            window.scrollTo(0, _top);
          }
          else if (_top > 1600 && _top <= 3200) {
            _top -= 60;
            window.scrollTo(0, _top);
          }
          else if (_top > 3200) {
            _top -= 100;
            window.scrollTo(0, _top);
          }
          else {
            window.scrollTo(0, 0);
            clearInterval(timer);
          }
        }, 10)
      }
    },
    mounted(){
      let _this = this;
      window.onscroll = function () {
        let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(_scrollTop < 300){
          _this.$store.commit("changeScrollTop",{
          _top:_scrollTop
        })
        }
        let _top = document.getElementById('back-top');
        if (_scrollTop >= 200) {
          _top.style.bottom = 5 + "%";
        }
        else {
          _top.style.bottom = -10 + "%";
        }
      }
    }
  }
</script>

<style lang="less">
  #back-top {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    bottom: -10%;
    right: 3%;
    z-index: 99;
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    -webkit-transition: all .5s; //设置改变bottom时的动画效果
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
    img {
      width: 30px;
      margin-top: 7px;
    }
  }
</style>

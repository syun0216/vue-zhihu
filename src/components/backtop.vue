<template>
  <span id="back-top" @click="scroller">
    <img src="../assets/TOP.png" alt="back to top"/>
  </span>
</template>

<script>
//todo:修改频繁commit store操作
import {mapState} from 'vuex'
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
        let _title = document.getElementsByClassName('p_title')[0];
        if(_this.$route.name === 'home'){
          _this._rDate.map((val,idx) => {
             if(_scrollTop >= val.minTop && _scrollTop <= val.maxTop){
                 _title.innerHTML = val.name;
             }
          });
        }
         if(_scrollTop < 300){
          _this.$store.commit("changeScrollTop",{
          _top:_scrollTop
        })
         }
        let _top = document.getElementById('back-top');
        if (_scrollTop >= 200) {
          _top.style.bottom = 15 + "%";
        }
        else {
          _top.style.bottom = -10 + "%";
        }
      }
    },
    computed:{
      ...mapState({
        _rDate : state => state.rememberDate
      })
    },
  }
</script>

<style lang="less">
  #back-top {
    background: linear-gradient(to top, rgba(30, 144, 255, .3) 0%, white 95%);
    position: fixed;
    bottom: -10%;
    right: 3%;
    z-index: 99;
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border-color:rgba(30, 144, 255, 1);
    box-shadow: 0 2px 3px rgba(30, 144, 255, 1);
    -webkit-transition: all .5s; //设置改变bottom时的动画效果
    -moz-transition: all .5s;
    /*-ms-transition: all .5s;*/
    -o-transition: all .5s;
    transition: all .5s;
    img {
      width: 30px;
      margin-top: 7px;
    }
  }
</style>

<template>
  <div id="app">
    <v-slidebar v-if="isSlideBarShow"></v-slidebar>
    <transition name="fade">
      <!-- <keep-alive> -->
        <router-view id="route-view"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
        transitionName: 'slide-left',
        isSlideBarShow:true
    }
  },
  watch:{
    '$route' (to, from) {
    // this.transitionName = to.path != "/con" ? 'slide-right' : 'slide-left';
    this.isSlideBarShow = !(to.path == "/con");
  },
  isOpen(){
    console.log(123);
  }
  },
  mounted(){

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 ;}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

.app-view-hidden {
    overflow: hidden;
}

 .slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
     -webkit-transform: translate(50vw, 0);
 }

 .slide-left-leave-active,
 .slide-right-enter {
     opacity: 0.1;
     -webkit-transform: translate(-50vw, 0);
 }
 .vux-no-group-title{
   margin-top:0 !important;
 }
 .weui-cell{
   padding:0 !important;
 }
 .vux-no-group-title{
   font-size:14px;
 }
</style>

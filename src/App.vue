<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
        transitionName: 'slide-left'
    }
  },
  '$route' (to, from) {
    this.transitionName = to.path != "/con" ? 'slide-right' : 'slide-left';
    console.log(this.transitionName);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50
 ;}
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
</style>

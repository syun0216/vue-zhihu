<template>
  <div id="app">
    <transition :name='transitionName'>
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      transitionName: 'slide-fade'
    }
  },
  watch:{
    '$route' (to, from) {
			this.transitionName = to.path != "/con" ? 'slide-right' : 'slide-fade';
		}
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
</style>

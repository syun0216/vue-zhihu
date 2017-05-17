<template>
  <div id="app">
    <v-slidebar v-if="isShow"></v-slidebar>
    <transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
        <!--这样做是只有你设置了meta: {keepAlive: true}的会被缓存，其他不会缓存。-->
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    data(){
      return {
        transitionName: 'slide-left',
      }
    },
    computed: {
      ...mapState({
        isShow: state => state.showSlideBar
      })
    },
    watch:{
        '$route'(){
            if(this.$route.name !== 'content'){
                this.$store.commit('changeShowSlideBar',{
                  isShow:true
                })
            }
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
    color: #2c3e50;;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }
  .app-view {
    width: 100vw;
    height: 100vh;
    overflow: auto;
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

  .vux-no-group-title {
    margin-top: 0 !important;
  }

  /*.weui-cell {
    padding: 0 !important;
  }*/
  .vux-label {
      margin: 0 4px 0 7px;
      text-shadow: 0px 1px 1px !important;
  }
  .vux-no-group-title {
    font-size: 14px;
  }
</style>

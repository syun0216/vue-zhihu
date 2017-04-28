// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import components from '../src/components'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    selectedName:null,
    selectedNum:null
  },
  mutations:{
    changeSelectedName(state,payload){
      state.selectedName = payload.name;
    },
    changeSelectedNum(state,payload){
      state.selectedNum = payload.num;
    }
  }
});

Object.keys(components).forEach((key)=>{
  let name = key.replace(/(\w)/, (v) => v.toUpperCase()); //首字母大写
  Vue.component(`v${name}`, components[key])
});

Vue.config.productionTip = false;
// let _appScrollTop = 0;
// let dom = document.documentElement || document.body;
// router.beforeEach((to,from,next) => {
//   if(to.path === '/con'){
//     _appScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//   }
//   next();
// });
//
// router.afterEach((to,from,next) => {
//   if ( to.path === '/con' ) {
//     dom.scrollTop = 0;
//   } else {
//     Vue.nextTick( () => {
//       dom.scrollTop = _appScrollTop;
//     } );
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

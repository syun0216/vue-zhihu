// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import components from '../src/components'
import vuex from 'vuex'

//
// const store = new vuex({
//
// });

Object.keys(components).forEach((key)=>{
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
  Vue.component(`v${name}`, components[key])
})

Vue.config.productionTip = false;
let _appScrollTop = 0;
let dom = document.documentElement || document.body;
router.beforeEach((to,from,next) => {
  if(to.path === '/con'){
    _appScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  }
  next();
});

router.afterEach((to,from,next) => {
  if ( to.path === '/con' ) {
    dom.scrollTop = 0;
  } else {
    Vue.nextTick( () => {
      dom.scrollTop = _appScrollTop;
    } );
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})

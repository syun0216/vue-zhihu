import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import home from '@/views/Home'
import content from '@/views/Content'
import theme from '@/views/Theme'
import comments from '@/views/Comment'
import startupinterface from '@/views/startupinterface'
import hot from '@/views/hot.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      component:startupinterface,
      name:'startupinterface',
      meta:{keepAlive:false}
    },
    {
			path: '/home',
			component: home,
			name: 'home',
      meta: {keepAlive: false},
		},
		{
			path: '/content',
			component: content,
			name: 'content',
      meta: {keepAlive: false},
		},
		{
			path: '/theme',
			component: theme,
			name: 'theme',
      meta: {keepAlive: true},
		},
    {
      path:'/hot',
      component:hot,
      name:'hot',
      meta:{ keepAlive:true},
    },
    {
      path:'/comment',
      component:comments,
      name:'comment',
      meta:{
        keepAlive:true
      }
    },
		{
			path: '*',
			redirect: '/'
}
  ]
})

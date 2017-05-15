import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import home from '@/views/Home'
import content from '@/views/Content'
import theme from '@/views/Theme'
import comments from '@/views/Comment'

Vue.use(Router);

export default new Router({
  routes: [
    {
			path: '/',
			component: home,
			name: 'home',
      meta: {keepAlive: true},
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
      path:'/comment',
      component:comments,
      name:'comment',
      meta:{
        keepAlive:false
      }
    },
		{
			path: '*',
			redirect: '/'
}
  ]
})

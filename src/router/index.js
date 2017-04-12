import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import home from '@/views/Home'
import con from '@/views/Con'
import theme from '@/views/Theme'

Vue.use(Router)

export default new Router({
  routes: [
    {
			path: '/',
			component: home,
			name: 'home'
		},
		{
			path: '/con',
			component: con,
			name: 'con'
		},
		{
			path: '/theme',
			component: theme,
			name: 'theme'
		},
		{
			path: '*',
			redirect: '/'
}
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Post from '@/views/Post'
import Create from '@/views/Create'
// import DetailView from '@/views/DetailView'
import Folder from '@/views/Folder'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/section/:section',
			name: 'section',
			component: Folder,
			children: [
				{ path: 'item/:id', component: Test }
			]
		},
		{
			path: '/item/:id',
			name: 'item',
			component: Test
		},
		{
			path: '/create',
			name: 'create',
			component: Create
		},
		{
			path: '/post',
			name: 'post',
			component: Post
		},
		{
			path: '/about',
			name: 'about',
			component: About
		}
	]
	// mode: 'history'
})

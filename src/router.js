import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Post from '@/views/Post'
import Create from '@/views/Create'
import DetailView from '@/views/DetailView'
import Folder from '@/views/Folder'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: 'главная'
			}
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: DetailView,
			meta: {
				title: 'F0cck'
			}
		},
		{
			path: '/folder/:id',
			name: 'folder',
			component: Folder
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

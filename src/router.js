import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Nav from '@/views/Nav'
import Create from '@/views/Create'
import Sound from '@/views/Sound'
// import DetailView from '@/views/DetailView'
import Folder from '@/views/Folder'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/nav',
			name: 'nav',
			component: Nav
		},
		{
			path: '/sound',
			name: 'sound',
			component: Sound
		},
		{
			path: '/about',
			name: 'about',
			component: About
		},
		{
			path: '/m/:id',
			name: 'item',
			props: true,
			component: Detail
		},
		{
			path: '/:section',
			name: 'section',
			component: Folder,
			children: [
				{ path: '/:section/:id', props: true, component: Detail }
			]
		},
		{
			path: '/create',
			name: 'create',
			component: Create
		}
	]
	// mode: 'history'
})

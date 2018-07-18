<template lang="pug">
v-app
	v-navigation-drawer( persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app )
		v-list
			v-list-tile( value="true" v-for="(item, i) in items" :key="i" @click="navigate(item.to)")
				v-list-tile-action
					v-icon( v-html="item.icon" )
				v-list-tile-content
					v-list-tile-title( v-text="item.title" )
	v-toolbar( app :clipped-left="clipped" flat scroll-off-screen scroll-threshold=100 )
		v-toolbar-side-icon( @click.stop="drawer = !drawer" )
		v-toolbar-title( v-text="title" )
		v-spacer/
		v-btn( icon @click.stop="rightDrawer = !rightDrawer" )
			v-icon menu
	v-content
		v-slide-y-transition(mode="out-in")
			router-view/
	v-navigation-drawer( temporary :right="right" v-model="rightDrawer" fixed app )
		v-list
			v-list-tile( @click="right = !right" )
				v-list-tile-action
					v-icon compare_arrows
				v-list-tile-title Switch drawer (click me)
	v-bottom-nav( app :value="true" )
		v-btn(flat color="teal")
			span Recents
				v-icon history
		v-btn( flat color="teal" )
			span Favorites
			v-icon favorite
		v-btn( flat color="teal" )
			span Nearby
			v-icon place
</template>

<script>

export default {
	name: 'App',
	data () {
		return {
			clipped: true,
			drawer: true,
			fixed: true,
			items: [
				{ icon: 'bubble_chart', title: 'Home', to: '/' },
				{ icon: 'bubble_chart', title: 'Post a cat', to: '/post' }
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Docsvision'
		}
	},
	methods: {
		navigate (e) {
			this.$router.push(e)
			this.drawer = false
		}
	}
}
</script>

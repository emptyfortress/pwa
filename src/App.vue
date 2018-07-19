<template lang="pug">
v-app
	v-navigation-drawer( v-model="drawer" clipped floating disable-route-watcher app :mini-variant="miniVariant" )
		v-list
			v-list-tile( value="true" v-for="(item, i) in items" :key="i" @click="navigate(item.to)")
				v-list-tile-action
					v-icon( v-html="item.icon" )
				v-list-tile-content
					v-list-tile-title( v-text="item.title" )
	v-toolbar( app flat clipped-left v-if="$vuetify.breakpoint.lgAndUp")
		v-toolbar-side-icon( @click.stop="drawer = !drawer" )
		v-toolbar-title( v-text="title" )
		v-spacer/
		v-btn( icon @click.stop="rightDrawer = !rightDrawer" )
			v-icon menu
	v-toolbar( app flat scroll-off-screen scroll-threshold=100 dark v-if="$vuetify.breakpoint.mdAndDown" )
		v-toolbar-title( v-text="title" )
	v-content
		v-slide-y-transition(mode="out-in")
			router-view/
	v-bottom-nav(app value="true" dark)
		v-layout( row wrap )
			v-flex
				v-btn( flat color="teal" @click.stop="drawer = !drawer" )
					v-icon menu
			v-flex
				v-btn( flat color="teal" @click.stop="drawer = !drawer" )
					v-icon menu
			v-spacer
			v-flex
				v-btn( flat color="teal" @click.stop="drawer = !drawer" )
					v-icon menu
</template>

<script>

export default {
	name: 'App',
	data () {
		return {
			clipped: true,
			drawer: true,
			fixed: true,
			sheet: false,
			tiles: [
				{ img: 'keep.png', title: 'Keep' },
				{ img: 'inbox.png', title: 'Inbox' },
				{ img: 'hangouts.png', title: 'Hangouts' },
				{ img: 'messenger.png', title: 'Messenger' },
				{ img: 'google.png', title: 'Google+' }
			],
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

<style scoped lang="scss">
</style>

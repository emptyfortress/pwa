<template lang="pug">
v-app
	v-navigation-drawer( v-model="drawer" floating disable-route-watcher fixed app :mini-variant="miniVariant" )
		v-list
			v-list-tile( value="true" v-for="(item, i) in items" :key="i" @click="navigate(item.to)")
				v-list-tile-action
					v-icon( v-html="item.icon" )
				v-list-tile-content
					v-list-tile-title( v-text="item.title" )
	v-toolbar( app flat clipped-left )
		v-toolbar-side-icon( @click.stop="drawer = !drawer" )
		v-toolbar-title( v-text="title" )
		v-spacer/
		v-btn( icon @click.stop="rightDrawer = !rightDrawer" )
			v-icon menu
	v-content
		v-slide-y-transition(mode="out-in")
			router-view/
	v-bottom-nav( fixed :value="true" ).hidden-sm-and-up
		v-btn(flat color="teal")
			span Recents
			v-icon history
		v-btn( flat color="teal" )
			span Favorites
			v-icon favorite
		v-btn( flat color="teal" )
			span Nearby
			v-icon place
	v-footer( app height=64 fixed clipped-left )
		p laskjdalsk
		<!-- v&#45;toolbar( flat ) -->
		<!-- 	v&#45;toolbar&#45;side&#45;icon( @click.stop="drawer = !drawer" ) -->
		<!-- 	v&#45;toolbar&#45;title( v&#45;text="title" ) -->
		<!-- 	v&#45;spacer/ -->
		<!-- 	v&#45;btn( icon @click.stop="rightDrawer = !rightDrawer" ) -->
		<!-- 		v&#45;icon menu -->
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

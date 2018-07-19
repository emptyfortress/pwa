<template lang="pug">
v-app
	v-navigation-drawer( v-model="drawer" clipped floating disable-route-watcher app :mini-variant="miniVariant" v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''")
		v-list
			v-list-tile( value="true" v-for="(item, i) in items" :key="i" @click="navigate(item.to)")
				v-list-tile-action
					v-icon( v-html="item.icon" )
				v-list-tile-content
					v-list-tile-title( v-text="item.title" )
	v-navigation-drawer( v-model="drawer1" temporary clipped right floating app v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''")
		v-list
			v-list-tile( value="true" v-for="(item, i) in items" :key="i" @click="navigate(item.to)")
				v-list-tile-action
					v-icon( v-html="item.icon" )
				v-list-tile-content
					v-list-tile-title( v-text="item.title" )
	v-toolbar( app flat clipped-left clipped-right v-if="$vuetify.breakpoint.lgAndUp")
		v-toolbar-side-icon( @click.stop="drawer = !drawer" )
		v-toolbar-title( v-text="title" )
		v-spacer/
		v-btn( icon @click.stop="drawer1 = !drawer1" )
			v-icon menu
		v-btn( icon @click.stop="drawer1 = !drawer1" )
			v-icon menu
		v-btn( icon @click.stop="drawer1 = !drawer1" )
			v-icon menu
	v-toolbar( app flat scroll-off-screen :scroll-threshold=100 dark v-if="$vuetify.breakpoint.mdAndDown" )
		v-btn( icon  )
			v-icon( @click="test" v-if="$route.path == '/'") home
			v-icon( @click="test" v-else) arrow_back
	v-content
		v-slide-y-transition(mode="out-in")
			router-view/
	v-toolbar(v-if="$vuetify.breakpoint.mdAndDown").my
		v-toolbar-side-icon( @click.stop="drawer = !drawer" )
		v-spacer
		v-toolbar-side-icon( @click.stop="drawer1 = !drawer1" )
</template>

<script>

export default {
	name: 'App',
	data () {
		return {
			styleObject: {
				marginTop: 0
			},
			clipped: true,
			thre: 100,
			drawer: true,
			drawer1: false,
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
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		},
		test () {
			console.log(this.$route.path)
		}
	}
}
</script>

<style scoped lang="scss">
.my {
	position: fixed;
	bottom: 0;
}
.shift {
	margin-top: 56px;
}
</style>

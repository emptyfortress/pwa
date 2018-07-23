<template lang="pug">
v-app.rel
	v-navigation-drawer( v-model="drawer" clipped floating app :mini-variant="miniVariant" v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''")
		v-list
			v-list-tile( value="true" v-for="(item, i) in items" :key="i" ripple @click="navigate(item.to)")
				v-list-tile-action
					v-icon( v-html="item.icon" )
				v-list-tile-content
					v-list-tile-title( v-text="item.title" )
			v-list-tile( ripple @click="navigate('/about')" )
				v-list-tile-action
					v-icon copyright
				v-list-tile-content
					v-list-tile-title About
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
		BottomSheet( narrow="true" )/
		v-btn( icon @click.stop="drawer1 = !drawer1" )
			v-icon settings
		v-btn( icon @click.stop="drawer1 = !drawer1" )
			v-icon menu
	v-toolbar( app flat scroll-off-screen :scroll-threshold=100 dark v-if="$vuetify.breakpoint.mdAndDown" )
		v-btn( icon to="/"  )
			v-icon( v-if="$route.path == '/'") home
			v-icon( v-else) arrow_back
	v-content.rel
		v-slide-y-transition(mode="out-in")
			router-view
	v-toolbar(v-if="$vuetify.breakpoint.mdAndDown").my
		v-toolbar-side-icon( @click.stop="drawer = !drawer" )
		v-spacer
		BottomSheet/
		v-spacer
		v-toolbar-side-icon( @click.stop="drawer1 = !drawer1" )
</template>

<script>
import BottomSheet from '@/components/BottomSheet'

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
		}
	},
	components: {
		BottomSheet
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

.close {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
}

.rel {
	position: relative;
}
</style>

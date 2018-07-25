<template lang="pug" >
v-app.rel
	template( v-if="authorised" )
		v-navigation-drawer( v-model="leftDrawer" clipped floating app :mini-variant="miniVariant" v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" )
			DrawerLeftContent /
		v-navigation-drawer( v-model="drawer1" temporary clipped right floating app v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" )
			DrawerRightContent /

		v-toolbar( app flat clipped-left clipped-right color="primary" v-if="$vuetify.breakpoint.lgAndUp" )
			v-toolbar-side-icon( @click.stop="leftDrawer = !leftDrawer" )
			v-toolbar-title( v-text="title" )
			v-spacer/
			BottomSheet( narrow="true" )/
			v-btn( icon @click.stop="changeTheme" )
				v-icon settings
			v-btn( icon @click.stop="drawer1 = !drawer1" )
				v-icon menu

		v-toolbar( app flat scroll-off-screen :scroll-threshold=100 v-if="$vuetify.breakpoint.mdAndDown" )
			v-btn( icon to="/"  )
				v-icon( v-if="$route.path == '/'") home
				v-icon( v-else) arrow_back

		v-content.rel
			v-slide-y-transition(mode="out-in")
				router-view

		v-toolbar(v-if="$vuetify.breakpoint.mdAndDown" ).my
			v-toolbar-side-icon( @click.stop="leftDrawer = !leftDrawer" )
			v-spacer
			BottomSheet/
			v-spacer
			v-toolbar-side-icon( @click.stop="drawer1 = !drawer1" )

	template( v-else )
		Login
</template>

<script>
import DrawerLeftContent from '@/components/DrawerLeftContent'
import DrawerRightContent from '@/components/DrawerRightContent'
import BottomSheet from '@/components/BottomSheet'
import Login from '@/views/Login'

export default {
	name: 'App',
	data () {
		return {
			styleObject: {
				marginTop: 0
			},
			authorised: true,
			notLogged: true,
			clipped: true,
			leftDrawer: false,
			thre: 100,
			drawer1: false,
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
	computed: {
	},
	methods: {
		navigate (e) {
			this.$router.push(e)
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		},
		changeTheme () {
			this.$vuetify.theme.primary = '#4caf50'
		}
	},
	components: {
		BottomSheet,
		DrawerLeftContent,
		DrawerRightContent,
		Login
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

<template lang="pug" >
v-app( :dark="night" ).rel
	template( v-if="userLogged" )
		v-navigation-drawer( v-model="leftDrawer" clipped floating app :mini-variant="miniVariant" v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" )
			DrawerLeftContent /
		v-navigation-drawer( v-model="drawer1" temporary clipped right floating app v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" ).white
			DrawerRightContent /

		v-toolbar( app flat clipped-left clipped-right v-if="$vuetify.breakpoint.lgAndUp" )
			v-toolbar-side-icon( @click.stop="leftDrawer = !leftDrawer" )
			v-spacer/
			v-toolbar-title( v-text="pageTitle" )
			v-spacer/
			BottomSheet( narrow="true" )/
			v-btn( icon @click.stop="changeTheme" )
				v-icon settings
			v-btn( icon @click.stop="drawer1 = !drawer1" )
				v-icon menu

		v-toolbar( app flat scroll-off-screen :scroll-threshold=100 v-if="$vuetify.breakpoint.mdAndDown" )
			v-btn( icon to="/"  v-if="$route.path !== '/'" )
				v-icon arrow_back
			v-toolbar-title( v-text="pageTitle" )

		v-content.rel
			v-slide-y-transition(mode="out-in")
				router-view

		v-toolbar(v-if="$vuetify.breakpoint.mdAndDown"  flat ).my
			v-toolbar-side-icon( @click.stop="leftDrawer = !leftDrawer" )
			v-spacer
			BottomSheet/
			v-spacer
			v-toolbar-side-icon( @click.stop="drawer1 = !drawer1" )

	template( v-else )
		Login
</template>

<script>
// import router from './router'
import DrawerLeftContent from '@/components/DrawerLeftContent'
import DrawerRightContent from '@/components/DrawerRightContent'
import BottomSheet from '@/components/BottomSheet'
import Login from '@/views/Login'

export default {
	name: 'App',
	data () {
		return {
			night: false,
			styleObject: {
				marginTop: 0,
				background: '#fff'
			},
			// authorised: true,
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
			rightDrawer: false
		}
	},
	computed: {
		pageTitle () {
			return this.$route.meta.title
		},
		userLogged () {
			return true
			// return this.$store.getters.user
		}
	},
	methods: {
		navigate (e) {
			this.$router.push(e)
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		},
		changeTheme () {
			this.night = !this.night
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

.rel {
	position: relative;
}

.v-toolbar__title {
	/* font-weight: 400; */
	text-transform: uppercase;
	font-size: 1rem;
}

</style>

<template lang="pug" >
v-app( :dark="night" ).rel
	template( v-if="userLogged" )
		v-navigation-drawer( v-model="leftDrawer" clipped floating app :mini-variant="miniVariant" v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" )
			DrawerLeftContent /
		v-navigation-drawer( v-model="drawer1" temporary clipped right floating app v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" ).white
			DrawerRightContent /

		v-toolbar( app flat clipped-left clipped-right v-if="$vuetify.breakpoint.lgAndUp")
			v-toolbar-side-icon( @click.stop="leftDrawer = !leftDrawer" )
			<!-- v&#45;spacer/ -->
			v-toolbar-title( v-text="currentFolder.text" )
			v-spacer/
			BottomSheet( narrow="true" )/
			v-btn( icon @click.stop="changeTheme" )
				v-icon settings
			v-btn( icon @click.stop="drawer1 = !drawer1" )
				v-icon menu

		v-toolbar( app flat scroll-off-screen :scroll-threshold=100 v-if="$vuetify.breakpoint.mdAndDown" )
			v-btn( icon @click="back"  v-if="$route.path !== '/'" )
				v-icon arrow_back
			v-toolbar-title( v-text="$route.path !== '/' ? currentFolder.text : 'Сводка'" )

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
			notLogged: true,
			clipped: true,
			leftDrawer: false,
			thre: 100,
			drawer1: false,
			sheet: false,
			calc: 'test',
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
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		userLogged () {
			return true
			// return this.$store.getters.user
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
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
	font-weight: 400;
	text-transform: uppercase;
	font-size: 1rem;
	&:not(:first-child) {
		margin-left: 0;
	}
}

</style>

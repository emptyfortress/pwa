<template lang="pug" >
v-app( :dark="night" ).rel
	template( v-if="userLogged" )
		v-navigation-drawer( v-model="leftDrawer" clipped floating app :mini-variant="miniVariant" v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" )
			DrawerLeftContent /
		v-navigation-drawer( v-model="drawer1" temporary clipped right floating app v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" ).white
			DrawerRightContent /

		v-toolbar( app flat clipped-left clipped-right v-if="$vuetify.breakpoint.lgAndUp" )
			v-toolbar-side-icon( @click.stop="leftDrawer = !leftDrawer" )
			<!-- v&#45;spacer/ -->
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
			const myTitle = this.$route.meta.title || this.page(this.$route.path.split('/')[2])
			this.$store.commit('setTitle', myTitle)
			return myTitle
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
		},
		page (e) {
			if (e === '1') return 'Мои задания'
			if (e === '1.1') return 'Входящие'
			if (e === '1.2') return 'В работе'
			if (e === '1.3') return 'На контроле'
			if (e === '1.4') return 'Ответственное исполнение'
			if (e === '2') return 'Исходящие'
			if (e === '2.1') return 'Делегировано'
			if (e === '2.2') return 'Завершено'
			if (e === '3') return 'Поиск заданий'
			if (e === '4') return 'Мои документы'
			if (e === '4.1') return 'Поиск документов'
			if (e === '4.2') return 'Я - автор'
			if (e === '4.3') return 'Я - исполнитель'
			if (e === '4.4') return 'Я - контролер'
			if (e === '5') return 'Замещение'
			if (e === '5.1') return 'Постоянное замещение'
			if (e === '5.2') return 'Временное замещение'
			if (e === '6') return 'Мои группы'
			if (e === '6.1') return 'Группа 1'
			if (e === '6.2') return 'Группа 2'
			if (e === '6.3') return 'Группа 3'
			if (e === '6.4') return 'Группа 4'
			if (e === '6.5') return 'Группа 5'
			if (e === '6.6') return 'Группа 6'
			if (e === '7') return 'Мои папки'
			if (e === '7.1') return 'Папка 5'
			if (e === '7.2') return 'Папка 5.1'
			if (e === '7.3') return 'Папка 5.2'
			if (e === '7.4') return 'Папка 5.3'
			if (e === '8') return 'Папка 6'
			if (e === '8.1') return 'Папка  6.1'
			if (e === '8.2') return 'Папка 6.1.1'
			if (e === '8.3') return 'Папка 6.1.2'
			if (e === '8.4') return 'Папка 6.1.3'
			if (e === '9') return 'Папка 6.2'
			if (e === '10') return 'Папка 6.3'
			if (e === '11') return 'Папка 6.4'
			if (e === '12') return 'Папка 7'
			if (e === '13') return 'Папка 8'
			if (e === '13.') return 'Папка 8.1'
			if (e === '13.') return 'Папка 8.2'
			if (e === '13.') return 'Папка 8.3'
			if (e === '13.') return 'Папка 8.4'
			if (e === '14') return 'Папка 9'
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

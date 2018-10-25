<template lang="pug" >
v-app( :dark="night" ).rel
	template( v-if="userLogged" )
		v-navigation-drawer( v-model="leftDrawer" clipped floating app :mini-variant="miniVariant" v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" )
			DrawerLeftContent /
		v-navigation-drawer( v-model="drawer1" temporary clipped right floating app v-bind:style="$vuetify.breakpoint.mdAndDown ? styleObject : ''" )
			DrawerRightContent /

		v-toolbar( app flat clipped-left clipped-right v-if="$vuetify.breakpoint.lgAndUp"  )
			v-btn( icon @click.stop="leftDrawer = !leftDrawer")
				i.icon-ham-d
			v-toolbar-title( v-text="currentFolder.text" )
			v-spacer/
			v-slide-y-transition(mode="out-in")
				v-btn-toggle( v-model="switchView" class="transparent" v-if="$route.path !== '/' && $route.path !== '/archive'")
					v-btn( :value="1" flat @click="toggleView('tile')")
						v-icon view_carousel
					v-btn(:value="2" flat  @click="toggleView('split')")
						v-icon  vertical_split
					v-btn(:value="3" flat  @click="toggleView('table')")
						v-icon view_comfy

			BottomSheet( narrow="true" )/
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

	v-scale-transition(origin="bottom right 0")
		AddTask(v-if="addTask")

	v-slide-y-reverse-transition
		v-btn( fab dark large color="info" v-if="!min" @click="toggleTask" :class="addTask ? 'rotate' : ''" ).fab
			v-icon(dark) add

	v-slide-y-reverse-transition
		Min(v-if="min")

</template>

<script>
// import router from './router'
import DrawerLeftContent from '@/components/DrawerLeftContent'
import DrawerRightContent from '@/components/DrawerRightContent'
import BottomSheet from '@/components/BottomSheet'
import Login from '@/views/Login'
import AddTask from '@/components/AddTask'
import Min from '@/components/Min'

export default {
	name: 'App',
	data () {
		return {
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
			switchView: 1,
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
		min () {
			return this.$store.getters.min
		},
		addTask () {
			return this.$store.getters.addTask
		},
		night () {
			return this.$store.getters.theme
		},
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		userLogged () {
			return true
			// return this.$store.getters.user
		}
	},
	methods: {
		toggleTask () {
			this.$store.commit('toggleAddTask')
		},
		back () {
			this.$router.go(-1)
		},
		navigate (e) {
			this.$router.push(e)
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		},
		changeTheme () {
			this.$store.commit('toggleTheme')
		},
		toggleView (e) {
			if (e === 'tile') {
				this.switchView = 1
			} else if (e === 'split') {
				this.switchView = 2
			} else if (e === 'table') {
				this.switchView = 3
			}
			this.$store.commit('toggleView', e)
		}
	},
	components: {
		BottomSheet,
		DrawerLeftContent,
		DrawerRightContent,
		Login,
		AddTask,
		Min
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

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

.v-btn--active {
	background: #ccc;
}

.fab {
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	z-index: 4;
	i {
		transition: all .3s ease;
	}
	&.rotate {
		i {
			transform: rotate(135deg);
		}
	}
}

</style>

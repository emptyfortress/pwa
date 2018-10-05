<template lang="pug">
v-list
	v-list-tile( value="true" v-for="(item, i) in items" :key="i" @click="navigate(item.to)")
		v-list-tile-action
			v-icon( v-html="item.icon" )
		v-list-tile-content
			v-list-tile-title( v-text="item.title" )
	v-list-tile( value="true" @click.stop="changeTheme")
		v-list-tile-action
			v-icon brightness_4
		v-list-tile-content
			v-list-tile-title Theme

</template>

<script>
export default {
	data () {
		return {
			items: [
				{ icon: 'bubble_chart', title: 'Home', to: '/' },
				{ icon: 'bubble_chart', title: 'Эксперимент', to: '/sound' }
			]
		}
	},
	methods: {
		changeTheme () {
			this.$store.commit('toggleTheme')
		},
		navigate (e) {
			this.$router.push(e)
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		}
	}
}
</script>

<style scoped lang="scss">

</style>

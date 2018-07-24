<template lang="pug">
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
</template>

<script>
export default {
	data () {
		return {
			items: [
				{ icon: 'bubble_chart', title: 'Home', to: '/' },
				{ icon: 'bubble_chart', title: 'Post a cat', to: '/post' }
			]
		}
	},
	methods: {
		navigate (e) {
			this.$router.push(e)
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		}
	}
}
</script>

<style scoped lang="scss">

</style>

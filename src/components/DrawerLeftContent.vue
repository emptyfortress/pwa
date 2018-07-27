<template lang="pug">
div
	v-layout(column wrap align-center v-if="$vuetify.breakpoint.mdAndDown")
		v-avatar( tile size="64px" align-center ).ma-3
			img( src="@/assets/img/dv-64.png" )
	tree( :data="treeData" :options="treeOptions" @node:selected="onNodeSelected")

	<!-- v&#45;layout(column wrap ) -->
	<!-- 	v&#45;list -->
	<!-- 		v&#45;list&#45;tile( v&#45;for="(item, i) in items" :key="i" ripple @click="navigate(item.to)") -->
	<!-- 			v&#45;list&#45;tile&#45;action -->
	<!-- 				v&#45;icon( v&#45;html="item.icon" ) -->
	<!-- 			v&#45;list&#45;tile&#45;content -->
	<!-- 				v&#45;list&#45;tile&#45;title( v&#45;text="item.title" ) -->
	<!-- 		v&#45;list&#45;tile( ripple @click="navigate('/about')" ) -->
	<!-- 			v&#45;list&#45;tile&#45;action -->
	<!-- 				v&#45;icon copyright -->
	<!-- 			v&#45;list&#45;tile&#45;content -->
	<!-- 				v&#45;list&#45;tile&#45;title About -->

</template>

<script>
export default {
	data () {
		return {
			items: [
				{ icon: 'bubble_chart', title: 'Home', to: '/' },
				{ icon: 'bubble_chart', title: 'Post a cat', to: '/post' }
			],
			treeData: [
				{ text: 'Item 1' },
				{ text: 'Item 2',
					state: { expanded: true },
					children: [
						{ text: 'Item 2.1' },
						{ text: 'Item 2.2' },
						{ text: 'Item 2.3' }
					]},
				{ text: 'Item 3', state: { selected: true } },
				{ text: 'Item 4' }
			],
			treeOptions: {

			}
		}
	},
	methods: {
		navigate (e) {
			this.$router.push(e)
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		},
		onNodeSelected (node) {
			console.log(node.text)
		}
	}
}
</script>

<style scoped lang="scss">

</style>

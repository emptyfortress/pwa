<template lang="pug">
div
	v-layout(column wrap align-center v-if="$vuetify.breakpoint.mdAndDown")
		v-avatar( tile size="64px" align-center ).ma-3
			img( src="@/assets/img/dv-64.png" )
	tree( :data="treeData" :options="treeOptions" @node:selected="onNodeSelected")

</template>

<script>
export default {
	data () {
		return {
			treeOptions: {
				checkbox: false
			}
		}
	},
	computed: {
		treeData () {
			return this.$store.state.folders
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

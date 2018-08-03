<template lang="pug">
div
	v-layout(column wrap align-center v-if="$vuetify.breakpoint.mdAndDown")
		v-avatar( tile size="64px" align-center ).ma-3
			img( src="@/assets/img/dv-64.png" )
	v-layout( column v-if="loading" align-center justify-center)
		v-flex.mt-5
			v-progress-circular( indeterminate color="primary" )
	v-layout( column v-else)
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
		loading () {
			return this.$store.getters.loading
		},
		treeData () {
			return this.$store.getters.folders
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

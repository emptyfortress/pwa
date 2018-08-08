<template lang="pug">
div
	v-layout(column wrap align-center v-if="$vuetify.breakpoint.mdAndDown")
		v-avatar( tile size="64px" align-center ).ma-3
			img( src="@/assets/img/dv-64.png" )
	v-layout( column v-if="loading" align-center justify-center)
		v-flex.mt-5
			v-progress-circular( indeterminate color="primary" )
			<!-- TODO: make normal loading fb&#45;style -->
	template( v-if="!loading" )
		v-text-field( v-model="filterFolder" label="Фильтр").ml-3.mr-3
		tree( :data="treeData" :filter="filterFolder" :options="treeOptions" @node:selected="onNodeSelected").tree-highlights

</template>

<script>
export default {
	data () {
		return {
			filterFolder: '',
			treeOptions: {
				checkbox: false,
				filter: {
					emptyText: 'Aaaaa! Где мои папки?!!',
					plainList: 0
				}
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
			this.$router.push(node.data.path)
		}
	}
}
</script>

<style scoped lang="scss">

</style>

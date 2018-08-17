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
		v-text-field(ref="input" v-model="filterFolder" label="Фильтр").ml-3.mr-3
		tree(ref="menu" :data="treeData" :filter="filterFolder" :options="treeOptions" @node:selected="onNodeSelected").tree-highlights

</template>

<script>

export default {
	data () {
		return {
			filterFolder: '',
			treeOptions: {
				checkbox: false,
				parentSelect: true,
				multiple: false,
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
		},
		selectedFolder () {
			return this.$store.getters.currentFolder
		}
	},
	watch: {
		selectedFolder (newVal, oldVal) {
			this.selectCurrentFolder(this.selectedFolder.text)
		}
	},
	methods: {
		selectCurrentFolder (text) {
			let current = this.$refs.menu.find(text)
			// let par = this.$refs.menu.find(text).parent
			current.select(true)
			current[0].parent.expand()
			// console.log(current[0].parent)
		},
		navigate (e) {
			this.$router.push(e)
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		},
		onNodeSelected (node) {
			this.$router.push(node.data.path)
			this.$store.commit('setCurrentFolder', node)
		}
	}
}
</script>

<style scoped lang="scss">
.test {
	background: #fff;
}
</style>

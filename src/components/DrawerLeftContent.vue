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
		v-text-field(ref="input" v-model="filterTree" label="Фильтр").ml-3.mr-3
		tree(ref="menu" :data="treeData" :filter="filterTree" :options="treeOptions" @node:selected="onNodeSelected").tree-highlights

</template>

<script>

export default {
	data () {
		return {
			filterTree: '',
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
		folders () {
			return this.$store.getters.folders
		},
		treeData () {
			return this.$store.getters.tree
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
			current.select(true)
			let par = current[0].parent
			while (par) {
				par.expand()
				par = par.parent
			}
		},
		navigate (e) {
			this.$router.push(e)
			this.$vuetify.breakpoint.mdAndDown ? this.drawer = false : this.drawer = true
		},
		onNodeSelected (node) {
			let toFolder = this.folders.filter(folder => folder.text === node.text)[0]
			this.$router.push(toFolder.path)
			this.$store.commit('setCurrentFolder', toFolder)
		}
	}
}
</script>

<style scoped lang="scss">
.tree-node.selected > .tree-content {
    background-color: #ccc;
	}
</style>

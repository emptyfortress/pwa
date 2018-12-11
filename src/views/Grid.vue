<template lang="pug">
.grid
	v-layout(row justify-space-between)
		.zag Grid grouping
		v-btn(@click="grouping = !grouping") Группировка
	v-layout( row )
		v-slide-x-transition(mode="out-in")
			v-flex(xs3 v-if="grouping")
				v-card
					tree(ref="filtr" :data="treeData" :options="treeOptions" @node:selected="onNodeSelected").tree-highlights
		v-flex
			.tabl alskdjlaskdj

</template>

<script>
export default {
	data () {
		return {
			grouping: false
		}
	},
	computed: {
		treeData () {
			return this.$store.getters.tree
		}
	},
	methods: {
	}
}
</script>
<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.grid {
	padding: 0 2rem;
}
.zag {
	font-size: 1.5rem;
	line-height: 200%;
}
.tabl {
	background: yellow;
}
</style>

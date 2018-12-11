<template lang="pug">
.grid
	v-layout(row justify-space-between)
		.zag Grid grouping
		v-btn(@click="grouping = !grouping") Группировка
	v-layout( row )
		v-slide-x-transition(mode="out-in")
			v-flex(xs3 v-if="grouping")
				drop(@dragover="over = true" @dragleave="over = false" @drop="handleGroup")
					v-card.group
						div(v-if="len === 0") Перетащите сюда колонку для группировки
						tree(v-if="len > 0" ref="filtr" :data="group" :options="treeOptions" @node:selected="onNodeSelected").tree-highlights
		v-flex
			DataTable /
			<!-- .tabl -->
			<!-- 	drag(class="drag" -->
			<!-- 		transfer&#45;data="column" -->
			<!-- 		@mousedown.native.stop -->
			<!-- 		slot="activator" -->
			<!-- 		@dragstart="userDrag = 1" -->
			<!-- 		@dragend="userDrag = null" -->
			<!-- 		) laksjdlak -->

</template>

<script>
import DataTable from '@/components/DataTable'

export default {
	data () {
		return {
			grouping: true,
			group: []
		}
	},
	computed: {
		len () {
			return this.group.length
		},
		treeData () {
			return this.$store.getters.tree
		}
	},
	methods: {
		handleGroup (data, event) {
			event.preventDefault()
			let obj = {}
			obj.text = data
			this.group.push(obj)
		}
	},
	components: {
		DataTable
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
.group {
	padding: 1rem;
	min-height: 10rem;
}
.drag {
	cursor: move;
}
</style>

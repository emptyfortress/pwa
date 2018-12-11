<template lang="pug">
.grid
	v-layout(row justify-space-between)
		.zag Grid grouping
		v-btn(@click="toggleGrouping") Группировка
	v-layout( row )
		v-slide-x-transition(mode="out-in")
			v-flex(xs3 v-if="grouping")
				drop(@dragover="over = true" @dragleave="over = false" @drop="handleGroup")
					v-card.group
						div(v-if="len === 0") Перетащите сюда колонку для группировки
						tree(v-if="len > 0" ref="filtr" :data="group" :options="treeOptions" @node:selected="onNodeSelected").tree-highlights
		v-flex(:class="grouping ? 'xs9' : 'xs12'").tabl
			DataTable1 /

</template>

<script>
import DataTable1 from '@/components/DataTable1'

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
		},
		toggleGrouping () {
			this.grouping = !this.grouping
		}
	},
	components: {
		DataTable1
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
	transition: all .3s ease;
}
.group {
	padding: 1rem;
	min-height: 10rem;
	margin-top: 57px;
	margin-right: 1rem;
}
.drag {
	cursor: move;
}
</style>

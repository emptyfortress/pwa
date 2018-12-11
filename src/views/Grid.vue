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
						tree(v-if="len > 0" ref="tree"
							:data="group"
							:options="treeOptions"
							@node:selected="onNodeSelected").tree-highlights
					v-btn(flat @click="reset").mt-2 Сброс
		v-flex(:class="grouping ? 'xs9' : 'xs12'").tabl
			DataTable1 /

</template>

<script>
import DataTable1 from '@/components/DataTable1'

export default {
	data () {
		return {
			grouping: true,
			group: [],
			grou: [
				{ text: 'one' },
				{ text: 'two' },
				{ text: 'three' },
				{ text: 'four' }
			],
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
		len () {
			return this.group.length
		},
		treeData () {
			return this.$store.getters.tree
		}
	},
	methods: {
		onNodeSelected (node) {
			console.log(this.group)
		},
		handleGroup (data, event) {
			event.preventDefault()
			let obj = {}
			obj.text = data.toString()
			this.group.push(obj)
			this.$refs.tree.tree.setModel(this.group)
		},
		toggleGrouping () {
			this.grouping = !this.grouping
		},
		reset () {
			this.group = []
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

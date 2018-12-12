<template lang="pug">
.grid
	v-layout(row justify-space-between)
		.zag Проверка группировки в таблицах
		v-btn(@click="toggleGrouping") Группировка
	v-layout( row )
		v-slide-x-transition(mode="out-in")
			v-flex(xs2 v-if="grouping")
				drop(@dragover="over = true" @dragleave="over = false" @drop="handleGroup")
					.group
						h3 Панель группировки
						.inf(v-if="len === 0")
							p Перетащите сюда колонку для группировки
						tree(v-if="len > 0" ref="tree"
							:data="group"
							:options="treeOptions"
							@node:selected="onNodeSelected").tree-highlights
					v-btn(flat @click="reset" v-if="len").mt-2 Сброс
		v-flex(:class="grouping ? 'xs10' : 'xs12'").tabl
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
		},
		items () {
			return this.$store.getters.items
		}
	},
	methods: {
		onNodeSelected (node) {
			console.log(this.group)
		},

		handleGroup (data, event) {
			event.preventDefault()
			let obj = {}
			let child = []
			this.items.forEach(function (item) {
				let node = item[data.name]
				child.push(node)
			})
			console.log(child)
			obj.text = data.text
			obj.children = child
			this.group.push(obj)
			let that = this
			setTimeout(function () {
				that.$refs.tree.tree.setModel(that.group)
			}, 0)
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
	border: 1px dashed $info;
}
.drag {
	cursor: move;
	background: red;
}
.inf p {
	font-style: italic;
	margin-top: 1rem;
	color: #666;

}
</style>

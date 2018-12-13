<template lang="pug">
.grid
	v-layout(row justify-space-between)
		.zag Проверка группировки в таблицах
		v-btn(@click="toggleGrouping") Группировка
	v-slide-y-transition(mode="out-in")
		drop(@dragover="over = true" @dragleave="over = false" @drop="handleGroup").group-top(v-if="grouping")
			.inf(v-if="len === 0") Перетащите сюда заголовок колонки для группировки
			SlickList( :value="group" axis="x" @input="newGroup"  v-else).crumbs
				SlickItem(v-for="(item, index) in group" :index="index" :key="index" :item="item")
					.crumb(@click.right="test(index)") {{ item.text }}
				.delete
					v-icon delete
					v-icon(@click="reset") close
	v-layout( row )
		v-slide-x-transition(mode="out-in")
			v-flex(xs2 v-if="group.length")
				.group
					h3 Группы
						span {{par}}
					tree(ref="tree" :data="list" :options="treeOptions" @node:selected="onNodeSelected").tree-group
		v-flex(:class="group.length ? 'xs10' : 'xs12'").tabl
			DataTable1(:filter="filter") /

</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import DataTable1 from '@/components/DataTable1'

export default {
	data () {
		return {
			filter: '',
			grouping: true,
			group: [],
			list: [],
			list2: [],
			par: null,
			treeOptions: {
				checkbox: false,
				parentSelect: true,
				dnd: true,
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
		items () {
			return this.$store.getters.items
		}
	},
	methods: {
		test (e) {
			console.log(e)
		},
		newGroup (e) {
			this.group = e
			console.log(this.group)
		},
		removeCrumb (index) {
			console.log(index)
		},
		onNodeSelected (node) {
			this.filter = node.text
		},

		handleGroup (data) {
			let obj = {}
			obj.text = data.text
			obj.children = []
			this.group.push(obj)
			this.handleItems(data)
			this.$refs.tree.tree.setModel(this.list)
		},

		uniqList (data, arr) {
			// let obj = {}
			let child = []
			let childs = []
			this.items.forEach(function (item) {
				let node = {}
				node.text = item[data.name]
				child.push(node)
			})
			let uniqChild = [ ...new Set(child.map(x => x.text)) ]
			uniqChild.forEach(function (item) {
				let node = {}
				node.text = item
				childs.push(node)
			})
			this.par = childs.length
			// obj.text = data.text + ' - ' + childs.length
			arr.push(...childs)
			console.log(childs.length)
			return arr
		},

		handleItems (data) {
			if (this.group.length === 1) {
				this.uniqList(data, this.list)
			} else if (this.group.length === 2) {
				let temp = this.uniqList(data, this.list2)
				this.list.forEach(function (item) {
					item.children = [...temp]
				})
				console.log(this.list)
			}
		},

		toggleGrouping () {
			this.grouping = !this.grouping
		},
		reset () {
			this.group = []
			this.list = []
			this.list2 = []
		}
	},
	components: {
		SlickList,
		SlickItem,
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
	margin-top: .6rem;
	h3 {
		background: white;
		padding: .5rem 1rem;
		span {
			margin-left: 1rem;
			font-size: .9rem;
			background: $info;
			color: white;
			padding: .1rem .5rem;
			border-radius: 3rem;
		}
		/* margin-bottom: 1rem; */
	}
}
.group-top {
	padding: 1rem;
	border: 1px dashed $info;
}
.drag {
	cursor: move;
	background: red;
}
.inf {
	font-style: italic;
	color: #666;
}
.reset {
	width: 100%;
	position: absolute;
	left: 0;
	top: -50px;
	margin-left: 0;
}
.crumbs {
	display: flex;
	position: relative;
	.crumb {
		margin-right: 1rem;
		&:after {
			content: "\2192";
			margin-left: 1rem;
		}
	}
}
.delete {
	position: absolute;
	right: 0
}

</style>

<template lang="pug">
.grid
	v-layout(row justify-space-between)
		.zag Проверка группировки в таблицах
		v-btn(@click="toggleGrouping") Группировка
	v-layout( row )
		v-slide-x-transition(mode="out-in")
			v-flex(xs2 v-if="grouping")
				.group
					v-btn(flat @click="reset" v-if="len").reset Сброс
					h3 Фильтры
					<!-- tree(v&#45;if="len > 0" ref="group" -->
					<!-- 	:data="group" -->
					<!-- 	:options="treeOptions" -->
					<!-- 	).tree&#45;group -->
				<!-- tree(v&#45;if="len > 0" ref="tree" -->
				<!-- 	:data="groupItems" -->
				<!-- 	:options="treeOptions" -->
				<!-- 	@node:selected="onNodeSelected").tree&#45;group -->
		v-flex(:class="grouping ? 'xs10' : 'xs12'").tabl
			v-slide-y-transition(mode="out-in")
				drop(@dragover="over = true" @dragleave="over = false" @drop="handleGroup").group-top(v-if="grouping")
					.inf(v-if="len === 0") Перетащите сюда колонку для группировки
					SlickList( :value="group" axis="x" @input="newGroup"  v-else).crumbs
						SlickItem(v-for="(item, index) in group" :index="index" :key="index" :item="item")
							.crumb(@click.right="test(index)") {{ item.text }}
						v-icon.delete delete
			DataTable1(:filter="filter") /

</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import DataTable1 from '@/components/DataTable1'

export default {
	data () {
		return {
			grouping: true,
			group: [],
			groupItems: [],
			filter: '',
			treeOptions: {
				checkbox: false,
				parentSelect: true,
				dnd: true,
				multiple: false
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
		test (e) {
			console.log(e)
		},
		newGroup (e) {
			this.group = e
		},
		removeCrumb (index) {
			console.log(index)
		},
		onNodeSelected (node) {
			this.filter = node.text
			console.log(node.text)
		},

		handleGroup (data) {
			let obj = {}
			obj.text = data.text
			obj.children = []
			this.group.push(obj)
			// this.handleItems(data)
		},
		handleItems (data) {
			let obj = {}
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
			obj.text = data.text + ' - ' + childs.length
			obj.children = childs
			this.groupItems.push(obj)
		// 	let that = this
		// 	setTimeout(function () {
		// 		that.$refs.tree.tree.setModel(that.group)
		// 	}, 0)
		},

		// handleGroup (data, event) {
		// 	let obj = {}
		// 	let child = []
		// 	let childs = []
		// 	this.items.forEach(function (item) {
		// 		let node = {}
		// 		node.text = item[data.name]
		// 		child.push(node)
		// 	})
		// 	let uniqChild = [ ...new Set(child.map(x => x.text)) ]
		// 	uniqChild.forEach(function (item) {
		// 		let node = {}
		// 		node.text = item
		// 		childs.push(node)
		// 	})
		// 	obj.text = data.text
		// 	obj.children = childs
		// 	this.group.push(obj)
		// 	let that = this
		// 	setTimeout(function () {
		// 		that.$refs.tree.tree.setModel(that.group)
		// 	}, 0)
		// },

		toggleGrouping () {
			this.grouping = !this.grouping
		},
		reset () {
			this.group = []
			this.groupItems = []
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
	padding: 1rem;
	min-height: 10rem;
	margin-top: 57px;
	margin-right: 1rem;
	border: 1px dashed $info;
	position: relative;
}
.group-top {
	padding: 1rem;
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

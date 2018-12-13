<template lang="pug">
.grid
	v-layout(row justify-space-between)
		.zag Проверка группировки в таблицах
		v-btn(@click="toggleGrouping") Группировка
	v-layout( row )
		v-slide-x-transition(mode="out-in")
			v-flex(xs2 v-if="grouping")
				drop(@dragover="over = true" @dragleave="over = false" @drop="handleGroup").group
					v-btn(flat @click="reset" v-if="len").reset Сброс
					h3 Панель группировки
					.inf(v-if="len === 0")
						p Перетащите сюда колонку для группировки
					tree(v-if="len > 0" ref="group"
						:data="group"
						:options="treeOptions"
						).tree-group
				tree(v-if="len > 0" ref="tree"
					:data="groupItems"
					:options="treeOptions"
					@node:selected="onNodeSelected").tree-group
		v-flex(:class="grouping ? 'xs10' : 'xs12'").tabl
			DataTable1(:filter="filter") /

</template>

<script>
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
		onNodeSelected (node) {
			this.filter = node.text
			console.log(node.text)
		},

		handleGroup (data) {
			let obj = {}
			obj.text = data.text
			obj.children = []
			if (this.group.length === 0) {
				this.group.push(obj)
			} else {
				this.group.push({ text: 'cool' })
				this.$refs.group.append('cool')
				console.log(this.group)
			}
			this.handleItems(data)
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
	/* min-height: 10rem; */
	margin-top: 57px;
	margin-right: 1rem;
	border: 1px dashed $info;
	position: relative;
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
.tree-children {
	background: red;
}
.reset {
	width: 100%;
	position: absolute;
	left: 0;
	top: -50px;
	margin-left: 0;

}

</style>

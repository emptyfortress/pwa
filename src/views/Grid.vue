<template lang="pug">
.grid

	vue-context( ref="menu" )
		ul(slot-scope="child" v-if="child.data").context
			<!-- li( @click="onClick($event.target.innerText)" ) Option 1 -->
			li( @click="removeGroup(child.data.name.text)" ) Удалить {{ child.data.name.text }} из группировки

	v-layout(row justify-space-between)
		.zag Проверка группировки в таблицах
		v-btn(@click="toggleGrouping") Группировка
	v-slide-y-transition(mode="out-in")
		<!-- drop.group&#45;top -->
		<!-- 	drag(:transfer&#45;data="foo") -->
		<!-- 		span test -->

		drop(@dragover="over = true" @dragleave="over = false" @drop="handleGroup" v-if="grouping" class="group-top" :class="{ over }")
			.inf(v-if="len === 0") Перетащите сюда заголовок колонки для группировки
			SlickList( :value="group" axis="x" @input="newGroup"  v-else).crumbs
				SlickItem(v-for="(item, index) in group" :index="index" :key="index" :item="item")
					.crumb(@contextmenu.prevent="$refs.menu.open($event, {name: item, index})") {{ item.text }}
				.delete
					v-icon(@click="reset") close

	v-layout( row )
		v-slide-x-transition(mode="out-in")
			v-flex(xs2 v-if="group.length")
				.group
					h3(@click="removeFilter") Группы
						span {{par}}
						v-icon(@click="chart = !chart") insert_chart_outlined
					tree(ref="tree" :data="list" :options="treeOptions" @node:selected="onNodeSelected").tree-group
						span(slot-scope="{node}").treenode
							span.text {{ node.text }}
							span.num {{ node.data.number }}

		v-flex(:class="group.length ? 'xs10' : 'xs12'").tabl
			.canva
				v-slide-y-transition(mode="out-in")
					.chart(v-if="chart")
						v-layout(row)
							v-flex(xs6)
								apexchart( type="bar" :options="chartOption" :series="series" )
				v-slide-y-transition(mode="out-in")
					DataTable1(:filter="filter" ) /

</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import DataTable1 from '@/components/DataTable1'
import { VueContext } from 'vue-context'

export default {
	data () {
		return {
			filter: '',
			grouping: true,
			chart: false,
			table: true,
			group: [],
			list: [],
			list2: [],
			over: false,
			treeOptions: {
				checkbox: false,
				parentSelect: true,
				dnd: true,
				multiple: false,
				filter: {
					emptyText: 'Aaaaa! Где мои папки?!!',
					plainList: 0
				}
			},
			chartOption: {
				chart: {
					id: 'vuechart-example'
				},
				xaxis: {
					categories: ['Гусев', 'Воробьев', 'Синичкина', 'Соловьева', 'Жаворонков', 'Уткин', 'Орлов']
				}
			},
			series: [{
				name: 'series-1',
				data: [40, 45, 50, 49, 60, 70, 91]
			}]
		}
	},
	created () {
		this.$store.dispatch('loadMetro')
	},
	computed: {
		metro () {
			return this.$store.getters.metro
		},
		par () {
			return this.list2.length ? this.list.length * this.list2.length : this.list.length
		},
		len () {
			return this.group.length
		},
		headers () {
			return this.$store.getters.headers
		}
	},
	methods: {
		removeGroup (e) {
			// console.log(this.group)
			let group1 = this.group.filter(item => item.text !== e)
			// this.$refs.tree.tree.setModel(this.list)
			// this.newGroup(this.group)
			let that = this
			this.group = []
			this.list = []
			this.list2 = []
			// this.$refs.tree.tree.remove(Node.enabled(), true)

			console.log(group1)
			this.group = [...group1]

		},
		removeFilter () {
			this.filter = ''
			let selection = this.$refs.tree.find({
				state: { selected: true }
			})
			selection.unselect()
		},
		newGroup (e) {
			this.group = e
			this.list.map(item => { item.children = [] })
			this.list2.map(item => { item.children = this.list })
			this.$refs.tree.tree.setModel(this.list2)
		},
		onNodeSelected (node) {
			this.filter = node.text
			console.log(this.filter)
			console.log(this.list)
		},

		handleGroup (data) {
			let obj = {}
			obj.text = data.text
			obj.children = []
			this.group.push(obj)
			this.handleItems(data)
			setTimeout(() => this.$refs.tree.tree.setModel(this.list), 0)
			this.hideColumn(data)
			this.over = false
		},

		hideColumn (e) {
			let col = this.headers.filter(item => item.text === e.text)[0]
			col.active = false
			console.log(col)
		},

		uniqList (data, arr) {
			let child = []
			let childs = []
			this.metro.forEach(function (item) {
				let node = {}
				node.text = item[data.name]
				child.push(node)
			})
			let uniqChild = [ ...new Set(child.map(x => x.text)) ]
			let that = this
			uniqChild.forEach(function (item) {
				let node = {}
				node.text = item
				node.data = {}
				let num = that.metro.filter(e => e[data.name] === item).length
				node.data.number = num
				childs.push(node)
			})
			arr.push(...childs)
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
			this.filter = ''
			this.$store.dispatch('loadHeaders')
		}
	},
	components: {
		SlickList,
		SlickItem,
		DataTable1,
		VueContext
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
		cursor: pointer;
		span {
			margin-left: 1rem;
			font-size: .9rem;
			background: $info;
			color: white;
			padding: .1rem .5rem;
			border-radius: 3rem;
		}
		.v-icon {
			margin-left: 2rem;
			vertical-align: bottom;
			color: $info;
		}
	}
}
.group-top {
	padding: 1rem;
	border: 1px dashed $info;
	&.over {
		background: #D9F9FF;
	}
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

.canva {
	margin-top: 8px;
	background: white;
	.chart {
		.apexcharts-canvas {
		}
	}
}
.treenode {
	width: 100%;
}
.num {
	/* background: $grey1; */
	background: white;
	color: #999;
	float: right;
	/* font-weight: bold; */
	padding: 0 .5rem;
	font-size: .9rem;
	line-height: 150%;
	margin-top: .2rem;
	border-radius: 3px;
}

.alltab {
	background: red;
	&.over {
		background: green;
	}
}
.v-context {
	outline: none;
}
</style>

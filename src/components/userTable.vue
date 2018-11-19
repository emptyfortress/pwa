<template lang="pug">
div.mx-3
	table.users
		thead
			tr
				th.sm
				th.text-xs-left ФИО
				th(v-if="hours").text-xs-center Длит. (час)
				th(v-if="!hours").text-xs-center Длит. (дни)
				th.text-xs-center Срок
				th.text-xs-left Доп. описание
				th.text-xs-center Ответств.
		tbody(id='table')
			tr(v-for="(item, index) in users" :key="index").item
				td.sm
					v-btn(icon @mousedown.native.stop).handle1
						v-icon drag_handle
				td.text-xs-left {{ item.name }}
				td(v-if="hours" width="40%").text-xs-center
					drag-zone.zone
						drag-content.content.c1
							.item item 1
						drag-handle.handle(@mousedown.native.stop)
							div
						drag-content.content.c2
							.item item 2

				td(v-if="!hours" width="40%" @click="test").text-xs-center
					drag-zone.zone
						drag-content.content.c0
							.item
						drag-handle.handle(@mousedown.native.stop)
							div
						drag-content.content.c1( :class="assignClass" )
							.item {{ item.days }}
						drag-handle.handle(@mousedown.native.stop)
							div
						drag-content.content.c2

				td.text-xs-center.rel.date
					v-menu(ref="menu"
					:close-on-content-click="!hours"
					v-model="item.menu" :nudge-right="30"
					transition="scale-transition"
					offset-y full-width )
						span(slot="activator") {{ datetime }}
						v-layout( row )
							v-date-picker(v-model="date" scrollable locale="ru-Ru" first-day-of-week=1 @input="item.menu=false" )
							v-time-picker(v-model="time" v-if="hours")
						v-layout( row justify-center v-if="hours")
							v-btn(flat color="success" @click="") Отмена
							v-btn(flat color="success" @click="") OK

				td(contenteditable ).text-xs-left Отсутствует
				td.text-xs-center.sm
					input(type="checkbox")

</template>

<script>
import Sortable from 'sortablejs'

export default {
	props: [ 'items', 'hours', 'sequence' ],

	data () {
		return {
			date: '2018-11-16',
			time: '19:00',
			menu: false
		}
	},
	computed: {
		assignClass () {
			if (this.sequence === '1') {
				return 'par'
			} else return ''
		},
		duration () {
			return this.$store.getters.duration
		},
		users () {
			let u = this.items.map(function (item) {
				return {
					name: item,
					date: '2018-11-16',
					time: '19:00',
					duration: 24,
					days: 3,
					menu: false
				}
			})
			return u
		},
		datetime () {
			return this.hours ? this.date + ' --- ' + this.time : this.date
		}
	},
	mounted () {
		let table = document.getElementById('table')
		Sortable.create(table, {
			draggable: '.item',
			handle: '.handle1'
		})
	},
	methods: {
		test () {
			console.log(this.users.length)
			console.log(this.sequence)
		}
	}
}
</script>

<style scoped lang="scss">

.users {
	width: 100%;
	th { color: #bbb; font-size: .85rem; border-bottom: 1px solid #eee; font-weight: 500; }
	tr:hover {
		background: #eee;
	}
	td {
		padding: 0 .5rem;
	}
	.sm { width: 30px; padding: 0;}
	.md { width: 80px; }
	.date { width: 150px; }
}

.handle1 {
	margin: 0;
}

.v-menu__content {
	background: #fff;
}

/deep/ .v-time-picker-title__time .v-picker__title__btn, /deep/ .v-time-picker-title__time  span {
	font-size: 56px;
	height: 56px;
}

.zone {
	width: 100%;
	height: 25px;
	margin: 0 auto;
	position: relative;
	clear: both;
	display: flex;
	line-height: 25px;
	.handle {
		width: 10px;
		div {
			width:8px;
			height: 100%;
			transform: translateX(3px);
		}
		&:hover {
			div { border-left: 3px dotted #333; }
		}
	}
	.content {
		width: calc((100% - 17px)/2);
		overflow: auto;
		background: #ccc;
		&.c2, &.c0 {
			/* background: transparent; */
			/* width: 1px; */
		}
		&.c1.par {
			/* background: $success; */
			width: 100%;
		}
	}
}
</style>

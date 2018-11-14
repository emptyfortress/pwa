<template lang="pug">
div.mx-3
	table.users
		thead
			tr
				th.sm
				th.text-xs-left ФИО
				th.text-xs-center Длит. (ч.)
				th.text-xs-center Срок
				th.text-xs-left Доп. описание
				th.text-xs-center Ответств.
		tbody(id='table')
			tr(v-for="(item, index) in users" :key="index").item
				td.sm
					v-btn(icon @mousedown.native.stop).handle
						v-icon drag_handle
				td.text-xs-left {{ item.name }}
				td.text-xs-center.md 1
				td.text-xs-center.rel
					v-menu(ref="menu"
					:close-on-content-click="false"
					v-model="menu[index]" :return-value.sync="date[index]"
					lazy transition="scale-transition"
					offset-y full-width )
						div(slot="activator" v-model="date[index]")
							span.mr-3 {{ date[index] }}
							span {{ time[index] }}
						v-layout( row )
							v-date-picker(v-model="date[index]" scrollable locale="ru-Ru" first-day-of-week=1)
							v-time-picker(v-model="time[index]")
						v-layout( row justify-center)
							v-btn(flat color="success" @click="menu[index] = false") Отмена
							v-btn(flat color="success") OK
				td.text-xs-left(contenteditable ) Отсутствует
				td.text-xs-center.sm
					input(type="checkbox")

</template>

<script>
import Sortable from 'sortablejs'

export default {
	props: [ 'items' ],
	data () {
		return {
			date: [ '2018-11-16', '2018-11-17' ],
			time: [ '19:00', '10:15' ],
			menu: [false]
		}
	},
	computed: {
		users () {
			let u = this.items.map(function (item) {
				return { name: item, date: '2018-11-16', time: '19:00' }
			})
			return u
		}
	},
	mounted () {
		let table = document.getElementById('table')
		Sortable.create(table, {
			draggable: '.item',
			handle: '.handle'
		})
		console.log(this.items)
	},
	methods: {
		doNothing (evt) {
			evt.stopPropagation()
		}
	}
}
</script>

[ 'Иванов', 'Петров' ]
[ {name: 'Иванов'}, {name: 'Петров'} ]


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
}

.handle {
	margin: 0;
}

.v-menu__content {
	background: #fff;
}

/deep/ .v-time-picker-title__time .v-picker__title__btn, /deep/ .v-time-picker-title__time  span {
	font-size: 56px;
	height: 56px;
}
</style>

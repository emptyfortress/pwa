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
			tr(v-for="(item, index) in items" :key="index").item
				td.sm
					v-btn(icon @mousedown.native.stop).handle
						v-icon drag_handle
				td.text-xs-left {{ item }}
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
							v-btn(flat color="success") Отмена
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
			menu: false
		}
	},
	computed: {
	},
	mounted () {
		let table = document.getElementById('table')
		Sortable.create(table, {
			draggable: '.item',
			handle: '.handle'
		})
	},
	methods: {
		doNothing (evt) {
			evt.stopPropagation()
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.users {
	width: 100%;
	th { color: $grey1; font-size: .85rem; border-bottom: 1px solid #eee; font-weight: 500; }
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
.v-time-picker-title__time .v-picker__title__btn, .v-time-picker-title__time span {
	height: auto;
	font-size: 56px;
}
.v-menu__content {
	background: #fff;
}
</style>

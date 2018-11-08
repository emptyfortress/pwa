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
			tr(v-for="(item, index) in items" :key="item").item
				td.sm
					v-btn(icon).handle
						v-icon drag_handle
				td.text-xs-left {{item}}
				td.text-xs-center.md 1
				td.text-xs-center 13 апр
				td.text-xs-left 13 апр
				td.text-xs-center 13 апр

</template>

<script>
import Sortable from 'sortablejs'

export default {
	props: [ 'items' ],
	data () {
		return {
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
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.users {
	/* margin: 0 1rem; */
	/* border-collapse: collapse; */
	width: 100%;
	th { font-size: .85rem; border-bottom: 1px solid #eee; font-weight: 500; }
	tr:hover {
		background: #eee;
	}
	td {
		padding: .5rem;
		/* border: 1px solid red; */
	}
}
.sm { width: 40px; }
.md { width: 80px; }

.handle {
	margin: 0;
}
</style>

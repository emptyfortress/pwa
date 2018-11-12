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
					v-btn(icon @mousedown.native.stop).handle
						v-icon drag_handle
				td.text-xs-left {{ item }}
					<!-- v&#45;edit&#45;dialog(:return&#45;value.sync="props.item" lazy @save="save" @cancel="cancel" @open="open" @close="close") {{ props.item }} -->
					<!-- 	v&#45;text&#45;field(slot="input" v&#45;model="props.item.name" :rules="[max25chars]" label="Edit" single&#45;line counter) -->
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
</style>

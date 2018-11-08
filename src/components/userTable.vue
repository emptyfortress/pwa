<template lang="pug">
table.users
	draggable(:options="{draggable: '.item', handle: '.handle'}")
		tr
			th
			th ФИО
			th Длительность (ч.)
			th Срок
			th Доп. описание
			th Ответств.
		tr(v-for="(item, index) in items" :key="item").item
			td
				v-btn(icon).handle
					v-icon drag_handle
			td {{item}}
			td 1
			td 13 апр
			td 13 апр
			td 13 апр

</template>

<script>
import draggable from 'vuedraggable'

export default {
	props: [ 'items' ],
	data () {
		return {
		}
	},
	computed: {
	},
	components: {
		draggable
	},
	methods: {
		checkMove (e) {
			return false
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.users {
	/* font-size: 1.0rem; */
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
	margin: 0 1rem;
	border-collapse: collapse;
	width: 100%;
	tr:hover {
		background: #eee;
	}
	td {
		padding: .5rem;
	}
}

.handle {
	margin: 0;
}
</style>

<template lang="pug">
table.att
	tr
		td Статус:
		td {{ current.status }}
	tr
		td Автор:
		td {{ current.executor }}
	tr
		td Исполнитель:
		td {{ current.author }}
	tr(v-if="current.controler")
		td Контролер:
		td {{ current.controler }}
	tr
		td Создано:
		td {{ current.created }}
	tr
		td Срок:
		td {{ current.deadline }}
	tr(v-if="current.controler")
		td Срок контроля:
		td {{ current.controldate }}
	tr(v-if="current.files")
		td Вложения:
		td {{ current.files }}
	tr
		td(colspan="2")
			span &nbsp;
</template>

<script>
export default {
	props: ['current'],
	data () {
		return {

		}
	},
	computed: {
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.att {
	/* margin-bottom: 2rem; */
	margin-left: 1rem;
	td { padding-left: 1rem; }
}
</style>

<template lang="pug">
table.att
	tr
		td Автор:
		td {{ current.executor }}
	tr
		td Исполнитель:
		td {{ current.author }}
	tr
		td Контролер:
		td {{ current.author }}
	tr
		td Создано:
		td {{ current.created }}
	tr
		td Срок:
		td {{ current.deadline }}
	tr
		td Срок контроля:
		td {{ current.author }}
	tr
		td Статус:
		td {{ current.status }}
	tr(v-if="current.files")
		td Вложения:
		td {{ current.files }}
</template>

<script>
export default {
	props: ['current'],
	data() {
		return {
			rows: [
				{ val: 'author', label: 'Автор' },
				{ val: '', label: 'Исполнитель' },
				{ val: '', label: 'Контролер' },
				{ val: '', label: 'Создано' },
				{ val: '', label: 'Срок' },
				{ val: '', label: 'Срок контроля' },
				{ val: '', label: 'Статус' },
				{ val: '', label: 'Вложения' },
			]
			
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
	margin-bottom: 2rem;
	margin-left: 1rem;
	td { padding-left: 1rem; }
}
</style>

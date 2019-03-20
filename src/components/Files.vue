<template lang="pug">
table.att
	tr
		td Автор:
		td {{ current.executor }}
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
	/* margin-bottom: 2rem; */
	margin-left: 1rem;
	td { padding-left: 1rem; }
}
</style>

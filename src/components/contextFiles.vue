<template lang="pug">
.filePane.mx-3
	v-layout( align-center justify-center column fill-height )
		.absent
			v-layout(row align-center)
				i.icon-absentfile
				.notfound
					span Контекстные файлы не найдены.
					br
					span Откройте карточку, документ или задание,
					br
					span содержащие нужные вам файлы

</template>

<script>
export default {
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

.filePane {
	background: #eee;
	/* height: 150px; */
	padding: 1rem;
	.absent {
		i { font-size: 4.5em; color: #aaa; }
	}
}

</style>

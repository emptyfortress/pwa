<template lang="pug">
div
	v-layout(row wrap)
		v-flex(xs8)
			.block
				v-avatar(size=64)
					img(:src="require('@/assets/img/user0.svg')" ondragstart="return false;")
				.head
					h2 {{ props.item.title }}
					.sub
						span {{ props.item.author }}
						span {{ props.item.created }}
						span.status В работе
			.descr {{ props.item.descr }}
			v-layout( row wrap )
				v-flex.block
					table.attr
						tr
							td.px-0 Автор:
							td {{ props.item.author }}
						tr
							td.px-0 Исполнитель:
							td {{ props.item.executor }}
						tr
							td.px-0 Создано:
							td {{ props.item.created }}
						tr
							td.px-0 Изменено:
							td {{ props.item.modified }}
						tr
							td.px-0 Срок:
							td {{ props.item.deadline }}
						tr
							td.px-0 Вложений:
							td {{ props.item.files }}
				<!-- v&#45;spacer -->
				v-flex
					table.attr.files
						tr(v-for="file in files")
							td.px-1 {{ file.id }}
							td.px-1 {{ file.name }}
							td.px-1.text-xs-right {{ file.size }}
				v-spacer
				v-flex
					.buttons.mr-5
						v-btn(small color="info") В работу
						v-btn(small color="accent") Делегировать
						v-btn(small color="success") Согласовать
						v-btn(small color="error") Отклонить

		v-flex(xs4 v-if="props.item.files")
			img(:src="require('@/assets/img/docs/img' + props.item.id + '.jpg')" @click="front").preview

</template>

<script>
export default {
	props: ['props'],
	data () {
		return {
			files: [
				{ id: 1, name: 'Договор с ООО "Ромашка".doc', size: '15 kB' },
				{ id: 2, name: 'Смета расходов.xls', size: '5 kB' },
				{ id: 3, name: 'Приложение к договору.pdf', size: '43 kB' },
				{ id: 4, name: 'Список допущенных сотрудников.txt', size: '1 kB' }
			]
		}
	},
	computed: {
	},
	methods: {
		front () {
			let elem = this.$parent.$el
			if (elem.style.overflow === '') {
				elem.style.overflow = 'visible'
			} else elem.style.overflow = ''
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.block {
	display: flex;
	margin-bottom: 1rem;
	align-content: center;
	.v-avatar {
		margin-right: 1rem;
		background: #eee;
	}
}

h2 {
	font-weight: 400;
	text-transform: uppercase;
	margin-bottom: 1rem;
}
.preview {
	width: 100%;
	box-shadow: 0 0 5px #000000aa;
}

.descr {
	font-size: 1rem;
	margin-right: 1rem;
}
.sub {
	font-size: 1rem;
	color: $grey2;
	span {
		margin-right: 3rem;
		&.status {
			text-transform: uppercase;
			color: orange;
		}
	}
}

.attr {
	color: $grey2;
	margin-top: 1rem;
	tr { max-height: 20px; }
	td:first-child { text-align: right; }
	td {
		height: 20px;
		white-space: nowrap;
	}
	&.files {
		margin: 1rem 2rem;
		color: $secondary;
		td {
			font-size: 1.1rem;
		}
	}
}
.buttons {
	width: 150px;
	.v-btn {
		width: 100%;
	}
	&.pos {
		position: absolute;
		top: 0;
		left: 0;
	}
}
.rel {
	position: relative;
}

</style>

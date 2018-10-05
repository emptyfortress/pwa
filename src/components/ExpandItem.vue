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
			table.attr
				tr
					td Автор:
					td {{ props.item.author }}
				tr
					td Исполнитель:
					td {{ props.item.executor }}
				tr
					td Создано:
					td {{ props.item.created }}
				tr
					td Изменено:
					td {{ props.item.modified }}
				tr
					td Срок:
					td {{ props.item.deadline }}
				tr
					td Вложений:
					td {{ props.item.files }}
		v-flex(xs4)
			img(:src="require('@/assets/img/docs/img' + props.item.id + '.jpg')" @click="front").preview
</template>

<script>
export default {
	props: ['props'],
	data () {
		return {
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
		padding: 0 10px;
	}
}

</style>

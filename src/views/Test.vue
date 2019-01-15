<template lang="pug">
v-container(grid-list-md )
	v-card
		h3 Ссылки  (4)
		table
			tr.link(v-for="link in links")
				td
					.tit
						img(:src="require('@/assets/img/test/' + link.img + '.png')")
						a(href="#") {{ link.title }}
				td.opis {{ link.info }}
				td.inf
					v-menu(v-model="menu" offset-x :close-on-content-click="ff")
						img(slot="activator" :src="require('@/assets/img/test/info.png')")
						v-card.pop
							.opis this is type
							.head
								img(:src="require('@/assets/img/test/' + link.img + '.png')")
								span {{ link.title }}
							.attr
								.label
									| Автор:
									br
									| Дата создания:
									br
									| Атрибут:
								.val
									| {{ link.author }}
									br
									| {{ link.date }}
									br
									| Это атрибут
							br
							p(contenteditable) Это текстовое описание ссылки

</template>

<script>

export default {
	data () {
		return {
			ff: false,
			links: [
				{
					title: 'Docsvision5.docx',
					img: 'attach',
					author: 'Орлов П.А',
					date: '12.01.19',
					info: 'Вложение'
				},
				{
					title: 'Входящий договор',
					img: 'card',
					author: 'Воробьев Г.',
					date: '12.01.19',
					info: 'Связанная карточка'
				},
				{
					title: 'Исходящий',
					img: 'card',
					author: 'Воробьев Г.',
					date: '12.01.19',
					info: 'Связанная карточка'
				},
				{
					title: 'Входящий Вх-1 Исковое заявление',
					img: 'card',
					author: 'Уткин П.А',
					date: '12.01.19',
					info: 'Связанная карточка'
				},
				{
					title: 'docsvision.com',
					img: 'link',
					author: 'Лебедев Н.Н.',
					date: '12.01.19',
					info: 'Ссылка'
				}
			]
		}
	}
}
</script>

<style scoped lang="scss">
h3 {
	font-size: 1.2rem;
	text-align: left;
	font-weight: 400;
	border-bottom:1px solid #ccc;
	padding-bottom: 1rem;
}
.v-card {
	height: 80vh;
	padding: 2rem;
	font-size: 1.1rem;
}
table {
	width: 100%;
}

.link {
	height: 42px;
	padding: .2rem .5rem;
	img {
		vertical-align: bottom;
		margin-right: 1rem;
	}
	td {
		border-bottom: 1px solid #eee;
	}
}

.tit {
	a:hover {
		text-decoration: none;
	}
	/* text-decoration: underline; */
	/* color: #0048A7; */
}

.opis {
	font-size: 1.0rem;
	color: #666;
	font-style: italic;
	font-weight: 400;
}

.inf {
	cursor: pointer;
	width: 30px;
}
.attr {
	display: flex;
}

.pop {
	padding: 1rem;
	height: auto;
}
.head {
	font-size: 1.2rem;
	font-weight: 500;
	img {
		/* width: 25px; */
		vertical-align: bottom;
		margin-right: .7rem;
	}
	margin-bottom: 1.5rem;
}
.label {
	color: #888;
	white-space: nowrap;
	text-align: right;
}
.val {
	font-weight: 500;
	margin-left: .5rem;
}
</style>

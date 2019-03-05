<template lang="pug">
	v-card.main
		h3 Ссылки  (4)
		table
			tr.link(v-for="( link, index ) in links")
				td
					.tit
						img(:src="require('@/assets/img/test/' + link.img + '.png')")
						a(href="#") {{ link.title }}
				td.opis {{ link.info }}
				td(v-if="$vuetify.breakpoint.lgAndUp").dop {{ link.dopoln }}
				td.inf
					v-menu(offset-x :close-on-content-click="ff")
						img(slot="activator" :src="require('@/assets/img/test/info.png')")
						v-card.pop
							.linkadd Ссылку добавил: Воробьев К.Г.
								br
								| 05.12.18 <span>16:03</span>
							v-textarea( v-model="link.dopoln" auto-grow label="Описание ссылки" rows="1.5")
							.opis {{ link.info }}
							.head
								img(:src="require('@/assets/img/test/' + link.img + '.png')")
								a(href="#") {{ link.title }}
								<!-- span {{ link.title }} -->
							.attr( v-if="!link.show" )
								.label
									| Автор:
									br
									| Создан:
									br
									| {{ link.atrlabel }}
									br
									| {{ link.atrlabel1 }}
									br
									| {{ link.atrlabel2 }}
									br
									| {{ link.atrlabel3 }}
								.val
									| {{ link.author }}
									br
									| {{ link.date }}
									br
									| {{ link.atr }}
									br
									| {{ link.atr1 }}
									br
									| {{ link.atr2 }}
									br
									| {{ link.atr3 }}
							br
							p.dop {{ link.dopoln }}

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
					dopoln: '',
					atrlabel: 'Изменен',
					atr: '13.01.19',
					atrlabel1: 'Размер:',
					atr1: '30 kB',
					info: 'Вложение'
				},
				{
					title: 'Входящий договор',
					img: 'card',
					author: 'Воробьев Г.',
					date: '12.01.19',
					dopoln: 'Договор № 116 от 18.11.18, Контрагент: Ромашка ООО, Сумма: 180 000',
					atrlabel: 'Изменен',
					atr: '13.01.19',
					atrlabel1: 'Рег.№:',
					atr1: 'Вх-116 от 18.11.18',
					atrlabel2: 'Контрагент',
					atr2: 'ООО Ромашка',
					atrlabel3: 'Сумма',
					atr3: '180 000 руб.',
					info: 'Связанная карточка'
				},
				{
					title: 'Исходящий',
					img: 'card',
					author: 'Воробьев Г.',
					date: '12.01.19',
					dopoln: 'Рег.номер 005/19 от 12.01.10, Получатели: Ромашка ООО, Текстовое примечание просто для примера',
					atrlabel: 'Изменен',
					atr: '--',
					atrlabel1: 'Рег.№:',
					atr1: '005/19 от 12.01.18',
					atrlabel2: 'Получатель',
					atr2: 'ООО Ромашка',
					info: 'Связанная карточка'
				},
				{
					title: 'Входящий Вх-1 Исковое заявление',
					img: 'card',
					author: 'Уткин П.А',
					date: '12.01.19',
					dopoln: 'Рег.номер 005/19 от 12.01.10, Отправитель: Ромашка ООО',
					atrlabel: 'Изменен',
					atr: '--',
					atrlabel1: 'Рег.№:',
					atr1: 'Вх-1 от 11.01.18',
					atrlabel2: 'Отправитель',
					atr2: 'ООО Ромашка',
					info: 'Связанная карточка'
				},
				{
					title: 'docsvision.com',
					img: 'link',
					author: 'Лебедев Н.Н.',
					date: '12.01.19',
					dopoln: '',
					show: true,
					info: 'Ссылка'
				}
			]
		}
	},
	methods: {
		write (e) {
			console.log(e)
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
.main {
	margin-top: 3rem;
	margin-left: 3rem;
	margin-right: 3rem;
	padding: 2rem;
	font-size: 1.1rem;
}
table {
	width: 100%;
	td {
		padding-right: 2rem;
	}
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
}

.opis {
	font-size: 1.0rem;
	color: #666;
	font-style: italic;
	font-weight: 400;
	white-space: nowrap;
}

td.inf {
	cursor: pointer;
	width: 30px;
	padding-right: 0;
	img { margin-right: 0; }
}
.attr {
	display: flex;
}

.pop {
	padding: 1rem;
	height: auto;
	max-width: 300px;
}
.head {
	font-size: 1.2rem;
	font-weight: 500;
	img {
		/* width: 25px; */
		vertical-align: bottom;
		margin-right: .7rem;
	}
	margin-bottom: 1rem;
}
.label {
	color: #888;
	white-space: nowrap;
	/* text-align: right; */
}
.val {
	font-weight: 500;
	margin-left: .5rem;
}
.dop {
	line-height: 100%;
}
.linkadd {
	margin-bottom: .5rem;
	span {
		margin-left: 2rem;
	}
}
hr {
	margin-top: .3rem;
	margin-bottom: .3rem;
}
</style>

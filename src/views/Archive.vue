<template lang="pug" >
div
	.panel
		v-layout(row)
			v-slide-y-transition(mode="out-in")
				v-layout( row v-if="state === 1" key='1')
					v-flex(xs4)
						v-select(v-model="start" :items="filters" label="Фильтровать по").mx-3
					v-slide-y-transition(mode="out-in")
						v-menu(v-if="start === 'Дата создания'" ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="30" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px")
							v-text-field(slot="activator" v-model="date" label="Год, месяц" prepend-icon="event" readonly)
							v-date-picker(v-model="date" type="month" multiple scrollable locale="ru-ru")
								v-spacer
								v-btn(flat color="primary" @click="menu = false") Отмена
								v-btn(flat color="primary" @click="$refs.menu.save(date)") OK
						v-flex(v-if="start === 'Автор' || start === 'Исполнитель' || start === 'Сотрудник'" xs6 v-else key='three')
							v-autocomplete(:loading="personloading" :items="persons" :search-input.sync="search" v-model="select" solo multiple chips deletable-chips background-color="grey" cache-items class="mx-3" flat hide-no-data hide-details label="Искать в справочнике")
								template( slot="item" slot-scope="{ item, tile }" )
									v-list-tile-avatar
										img(:src="require('@/assets/img/user0.svg')").av
									v-list-tile-content
										v-list-tile-title {{ item }}
										v-list-tile-sub-title.small отдел, департамент
						<!-- v&#45;flex(xs7 v&#45;if="start === 'Тип документа' || start === 'Статус'" key='two') -->
						v-flex(xs7 v-else key='two')
							v-select(v-model="second" multiple :items="value" label="Значение").mx-3
					v-slide-y-transition(mode="out-in")
						v-flex(v-if="start !== ''" key="close")
							v-btn(flat icon @click='reset')
								v-icon close
			v-spacer
			v-slide-y-transition(mode="out-in")
				<!-- v&#45;btn(flat v&#45;if="state === 2" @click="state = 2" key='3') Применить фильтр -->
				v-btn(flat v-if="state === 1" @click="addFilter" key='k4') Добавить фильтр
				v-btn(flat v-if="state === 0" @click="state = 1" key='5') Задать фильтр

	v-layout( row wrap v-if="filterlist" )
		v-flex
			v-chip(v-model="chip1" v-for="slot in slots" color="info" text-color="white" close) {{ slot }}

	v-slide-y-reverse-transition(mode="out-in")
		v-layout(align-center justify-center column fill-height v-if="start === '' && state === 1" key="one").vcenter
			.zag За Последний месяц
			v-layout( row wrap )
				.butt(v-for="butt in buttons")
					v-btn(flat) {{ butt }}
			.zag.mt-5 За Последний квартал
			v-layout( row wrap )
				.butt(v-for="butt in buttons")
					v-btn(flat) {{ butt }}

		v-layout(align-center justify-center column fill-height v-if="state === 0" key="two").vcenter
			.arc
				p Архив содержит миллионы документов
				p
					i.icon-archive
				p Задайте критерии фильтра
</template>

<script>
export default {
	data () {
		return {
			chip1: true,
			chip2: false,
			chip3: false,
			chip4: false,
			state: 0,
			menu: false,
			date: null,
			start: '',
			second: '',
			filterlist: false,
			slots: [],
			personloading: false,
			search: null,
			items: [],
			select: null,
			doc: ['Задание', 'Групповое задание', 'Документ', 'Карточка', 'Договор', 'Служебная записка'],
			srok: ['Последний месяц', 'Последний квартал', 'Текущий месяц', 'Текущий квартал'],
			buttons: ['Я - автор', 'Я - исполнитель', 'Я - контролер', 'Договоры', 'Поручения', 'Служебки'],
			filters: [ 'Тип документа', 'Дата создания', 'Автор', 'Исполнитель', 'Сотрудник', 'Статус' ],
			stat: [ 'Согласовано', 'Согласовано с замечаниями', 'Делегировано', 'Отклонено', 'В работе' ],
			persons: [
				'Абрамов',
				'Авдеев',
				'Агафонов',
				'Аксёнов',
				'Александров',
				'Алексеев',
				'Андреев',
				'Анисимов',
				'Антонов',
				'Артемьев',
				'Архипов',
				'Афанасьев',
				'Баранов',
				'Белов',
				'Белозёров',
				'Белоусов',
				'Беляев',
				'Беляков',
				'Беспалов',
				'Бирюков',
				'Блинов',
				'Блохин',
				'Бобров',
				'Бобылёв',
				'Богданов',
				'Большаков',
				'Борисов',
				'Брагин',
				'Буров',
				'Быков',
				'Васильев',
				'Веселов',
				'Виноградов',
				'Вишняков',
				'Владимиров',
				'Власов',
				'Волков',
				'Воробьёв',
				'Воронов',
				'Воронцов',
				'Гаврилов',
				'Галкин',
				'Герасимов',
				'Голубев',
				'Горбачёв',
				'Горбунов',
				'Гордеев',
				'Горшков',
				'Григорьев',
				'Гришин',
				'Громов',
				'Гуляев',
				'Гурьев',
				'Гусев',
				'Гущин',
				'Давыдов',
				'Данилов',
				'Дементьев',
				'Денисов',
				'Дмитриев',
				'Доронин',
				'Дорофеев',
				'Дроздов',
				'Дьячков',
				'Евдокимов',
				'Евсеев',
				'Егоров',
				'Елисеев',
				'Емельянов',
				'Ермаков',
				'Ершов',
				'Ефимов',
				'Ефремов',
				'Жданов',
				'Жуков',
				'Журавлёв',
				'Зайцев',
				'Захаров',
				'Зимин',
				'Зиновьев',
				'Зуев',
				'Зыков',
				'Иванов',
				'Игнатов',
				'Игнатьев',
				'Ильин',
				'Исаев',
				'Исаков',
				'Кабанов',
				'Казаков',
				'Калашников',
				'Калинин',
				'Капустин',
				'Карпов',
				'Кириллов',
				'Киселёв',
				'Князев',
				'Ковалёв',
				'Козлов',
				'Колесников',
				'Колобов',
				'Комаров',
				'Комиссаров',
				'Кондратьев',
				'Коновалов',
				'Кононов',
				'Константинов',
				'Копылов',
				'Корнилов',
				'Королёв',
				'Костин',
				'Котов',
				'Кошелев',
				'Красильников',
				'Крылов',
				'Крюков',
				'Кудрявцев',
				'Кудряшов',
				'Кузнецов',
				'Кузьмин',
				'Кулагин',
				'Кулаков',
				'Куликов',
				'Лаврентьев',
				'Лазарев',
				'Лапин',
				'Ларионов',
				'Лебедев',
				'Лихачёв',
				'Лобанов',
				'Логинов',
				'Лукин',
				'Лыткин',
				'Макаров',
				'Максимов',
				'Мамонтов',
				'Марков',
				'Мартынов',
				'Маслов',
				'Матвеев',
				'Медведев',
				'Мельников',
				'Меркушев',
				'Миронов',
				'Михайлов',
				'Михеев',
				'Мишин',
				'Моисеев',
				'Молчанов',
				'Морозов',
				'Муравьёв',
				'Мухин',
				'Мясников',
				'Назаров',
				'Наумов',
				'Некрасов',
				'Нестеров',
				'Никитин',
				'Никифоров',
				'Николаев',
				'Никонов',
				'Новиков',
				'Носков',
				'Носов',
				'Овчинников',
				'Одинцов',
				'Орехов',
				'Орлов',
				'Осипов',
				'Павлов',
				'Панов',
				'Панфилов',
				'Пахомов',
				'Пестов',
				'Петров',
				'Петухов',
				'Поляков',
				'Пономарёв',
				'Попов',
				'Потапов',
				'Прохоров',
				'Рогов',
				'Родионов',
				'Рожков',
				'Романов',
				'Русаков',
				'Рыбаков',
				'Рябов',
				'Савельев',
				'Савин',
				'Сазонов',
				'Самойлов',
				'Самсонов',
				'Сафонов',
				'Селезнёв',
				'Селиверстов',
				'Семёнов',
				'Сергеев',
				'Сидоров',
				'Силин',
				'Симонов',
				'Ситников',
				'Смирнов',
				'Соболев',
				'Соколов',
				'Соловьёв',
				'Сорокин',
				'Степанов',
				'Стрелков',
				'Субботин',
				'Суворов',
				'Суханов',
				'Сысоев',
				'Тарасов',
				'Терентьев',
				'Тетерин',
				'Тимофеев',
				'Титов',
				'Тихонов',
				'Третьяков',
				'Трофимов',
				'Туров',
				'Уваров',
				'Устинов',
				'Фадеев',
				'Федосеев',
				'Федотов',
				'Филатов',
				'Филиппов',
				'Фокин',
				'Фомин',
				'Фомичёв',
				'Фролов',
				'Фёдоров',
				'Харитонов',
				'Хохлов',
				'Цветков',
				'Чернов',
				'Шарапов',
				'Шаров',
				'Шашков',
				'Шестаков',
				'Шилов',
				'Ширяев',
				'Шубин',
				'Щербаков',
				'Щукин',
				'Юдин',
				'Яковлев',
				'Якушев'
			]
		}
	},
	watch: {
		search (val) {
			val && val !== this.select && this.querySelections(val)
		}
	},
	computed: {
		slot () {
			let two = ''
			if (this.second) {
				two = this.second
			} else if (this.select) {
				two = this.select
			} else if (this.date) {
				two = this.date
			}
			return this.start + ': ' + two
		},
		value () {
			if (this.start === 'Тип документа') return this.doc
			else if (this.start === 'Дата создания') return this.srok
			else if (this.start === 'Статус') return this.stat
		}
	},
	methods: {
		reset () {
			this.start = ''
			this.second = ''
		},
		addFilter () {
			this.filterlist = true
			this.slots.push(this.slot)
			this.reset()
			// console.log(123)
		},
		querySelections (v) {
			this.personloading = true
			// Simulated ajax query
			setTimeout(() => {
				this.items = this.persons.filter(e => {
					return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
				})
				this.personloading = false
			}, 500)
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.v-autocomplete {
	border-bottom: 1px solid #333;
}
.panel {
	padding: .5rem 1rem;
	display: flex;
}
.arc {
	color: $grey2;
	text-align: center;
	p {
		font-size: 1.2rem;
	}
	i {
		font-size: 10rem;
		line-height: 1rem;
		opacity: .7;
	}
}
.vcenter {
	margin-top: 200px;
}
.zag {
	text-transform: uppercase;
	font-size: 2rem;
	font-weight: 300;
}
.application .theme--light.v-list .v-list__tile__mask, .theme--light .v-list .v-list__tile__mask {
	color: #fff;
	background: #333;
}

.av {
	background: $grey;
}
.small {
	font-size: .8rem;
	color: $grey2;
	font-style: italic;
}

</style>

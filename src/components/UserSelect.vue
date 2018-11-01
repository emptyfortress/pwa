<template lang="pug">
div.rel
	v-autocomplete(:loading="personloading"
			:items="pers"
			:search-input.sync="search"
			:label="label"
			background-color="transparent" cache-items
			v-model="selected"
			@change="onChange"
			class="mx-3" flat hide-no-data hide-details multiple chips deletable-chips
			)
		template(slot="selection" slot-scope="data")
			v-chip(:selected="data.selected"  close class="chip--select-multi" @input="remove(data.item)")
				v-avatar
					img(:src="require('@/assets/img/user0.svg')").dark
				span {{ data.item }}
		template( slot="item" slot-scope="{ item, tile }")
			v-list-tile-avatar
				img(:src="require('@/assets/img/role.svg')" v-if="role").av
				img(:src="require('@/assets/img/user0.svg')" v-if="!role").av
			v-list-tile-content
				v-list-tile-title {{ item }}
				v-list-tile-sub-title(v-if="!role").small отдел, департамент
	.list(v-if="tree")
		.pop
			tree(:data="deps" :options="treeOptions")
</template>

<script>
export default {
	props: ['label', 'value'],
	data () {
		return {
			personloading: false,
			search: null,
			tree: false,
			role: false,
			items: [],
			selected: this.value,
			roles: [
				'= Автор',
				'= Инициатор',
				'= Исполнитель',
				'= Согласующий',
				'= Контролер',
				'= Регистратор',
				'= Все руководители'
			],
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
			],
			deps: [
				{id: 0,
					text: 'Руководство',
					'image': '',
					children: [
						{id: 10, text: 'Производство', 'image': ''},
						{id: 11, text: 'Производство', 'image': ''},
						{id: 12, text: 'Производство', 'image': ''}
					]
				},
				{id: 1, text: 'Производство', 'image': ''},
				{id: 2, text: 'Логистика', 'image': ''},
				{id: 3, text: 'Сервис', 'image': ''},
				{id: 4, text: 'НИО', 'image': ''},
				{id: 5, text: 'Отдел внедрений', 'image': ''},
				{id: 6, text: 'Отдел АСУ', 'image': ''},
				{id: 7, text: 'Корпоративные продажи', 'image': ''}
			]
		}
	},
	watch: {
		search (val) {
			val && val !== this.select && this.querySelections(val)
			if (val === '\\') {
				this.tree = true
			}
			// else this.tree = false
			if (val === '=') {
				this.role = true
			} else this.role = false
		}
	},
	computed: {
		pers () {
			if (this.role) {
				return this.roles
			} else return this.persons
		}
	},
	methods: {
		onChange () {
			this.$emit('input', this.selected)
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
		},
		remove (item) {
			const index = this.selected.indexOf(item)
			if (index >= 0) this.selected.splice(index, 1)
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.v-autocomplete {
	border-bottom: 1px solid #333;
}

.application .theme--light.v-list .v-list__tile__mask, .theme--light .v-list .v-list__tile__mask {
	color: #fff;
	background: #333;
}

.rel { position: relative; }
.av {
	background: $grey;
}
.dark {
	background: #fff;
	background: -moz-linear-gradient(top, #05abe0 0%, #53cbf1 60%, #87e0fd 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top, #05abe0 0%,#53cbf1 60%,#87e0fd 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom, #05abe0 0%,#53cbf1 60%,#87e0fd 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#05abe0', endColorstr='#87e0fd',GradientType=0 ); /* IE6-9 */
}
.chip--select-multi {
	background: #d1e3f7;
	border: 1px solid #99bee8;
}
.small {
	font-size: .8rem;
	color: $grey2;
	font-style: italic;
}

.list {
	z-index: 2;
	position: absolute;
	top: 35px;
	left: 0;
	width: 100%;
	padding: .5rem 0;
	.pop {
		z-index: 35;
		background: #fff;
		margin: 0 1rem;
		box-shadow: 0 5px 10px #00000033;
		height: 250px;
		overflow: auto;
		.v-list {
			cursor: pointer;
			div:hover {
				background: #eee;
			}
		}
	}
}
</style>

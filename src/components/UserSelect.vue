<template lang="pug">
div.rel
	v-autocomplete(
			:items="pers"
			:search-input.sync="search"
			:label="label"
			item-text="name"
			item-value="name"
			background-color="transparent" cache-items
			v-model="selected"
			@change="onChange"
			class="mx-3" flat hide-no-data hide-details multiple chips
			)
		template(slot="selection" slot-scope="data")
			v-chip(:selected="data.selected" close class="chip--select-multi" @input="remove(data.item)")
				v-avatar
					img(:src="data.item.img").dark
				span {{ data.item.name }}
		template( slot="item" slot-scope="data")
			v-list-tile-avatar
				img(:src="data.item.img").av
			v-list-tile-content
				v-list-tile-title {{ data.item.name }}
				v-list-tile-sub-title(v-if="state === 'name'").small отдел, департамент
	<!-- .list(v&#45;if="tree") -->
	<!-- 	.pop -->
	<!-- 		tree(:data="deps" :options="treeOptions") -->
</template>

<script>
export default {
	props: ['label', 'value'],
	data () {
		let src = {
			1: '/img/user0.svg',
			2: '/img/user1.svg',
			3: '/img/role.svg'
		}
		return {
			search: null,
			state: 'name',
			// tree: false,
			// role: false,
			items: [],
			selected: this.value,
			roles: [
				{img: src[3], name: '=Автор'},
				{img: src[3], name: '=Инициатор'},
				{img: src[3], name: '=Исполнитель'},
				{img: src[3], name: '=Согласующий'},
				{img: src[3], name: '=Контролер'},
				{img: src[3], name: '=Регистратор'},
				{img: src[3], name: '=Все руководители'}
			],
			persons: [
				{img: src[1], name: 'Абрамов'},
				{img: src[1], name: 'Авдеев'},
				{img: src[1], name: 'Агафонов'},
				{img: src[1], name: 'Аксёнов'},
				{img: src[1], name: 'Александров'},
				{img: src[1], name: 'Алексеев'},
				{img: src[1], name: 'Андреев'},
				{img: src[1], name: 'Анисимов'},
				{img: src[1], name: 'Антонов'},
				{img: src[1], name: 'Артемьев'},
				{img: src[1], name: 'Архипов'},
				{img: src[1], name: 'Афанасьев'},
				{img: src[1], name: 'Баранов'},
				{img: src[1], name: 'Белов'},
				{img: src[1], name: 'Белозёров'},
				{img: src[1], name: 'Белоусов'},
				{img: src[1], name: 'Беляев'},
				{img: src[1], name: 'Беляков'},
				{img: src[1], name: 'Беспалов'},
				{img: src[1], name: 'Бирюков'},
				{img: src[1], name: 'Блинов'},
				{img: src[1], name: 'Блохин'},
				{img: src[1], name: 'Бобров'},
				{img: src[1], name: 'Бобылёв'},
				{img: src[1], name: 'Богданов'},
				{img: src[1], name: 'Большаков'},
				{img: src[1], name: 'Борисов'},
				{img: src[1], name: 'Брагин'},
				{img: src[1], name: 'Буров'},
				{img: src[1], name: 'Быков'},
				{img: src[1], name: 'Васильев'},
				{img: src[1], name: 'Веселов'},
				{img: src[1], name: 'Виноградов'},
				{img: src[1], name: 'Вишняков'},
				{img: src[1], name: 'Владимиров'},
				{img: src[1], name: 'Власов'},
				{img: src[1], name: 'Волков'},
				{img: src[1], name: 'Воробьёв'},
				{img: src[1], name: 'Воронов'},
				{img: src[1], name: 'Воронцов'},
				{img: src[1], name: 'Гаврилов'},
				{img: src[1], name: 'Галкин'},
				{img: src[1], name: 'Герасимов'},
				{img: src[1], name: 'Голубев'},
				{img: src[1], name: 'Горбачёв'},
				{img: src[1], name: 'Горбунов'},
				{img: src[1], name: 'Гордеев'},
				{img: src[1], name: 'Горшков'},
				{img: src[1], name: 'Григорьев'},
				{img: src[1], name: 'Гришин'},
				{img: src[1], name: 'Громов'},
				{img: src[1], name: 'Гуляев'},
				{img: src[1], name: 'Гурьев'},
				{img: src[1], name: 'Гусев'},
				{img: src[1], name: 'Гущин'},
				{img: src[1], name: 'Давыдов'},
				{img: src[1], name: 'Данилов'},
				{img: src[1], name: 'Дементьев'},
				{img: src[1], name: 'Денисов'},
				{img: src[1], name: 'Дмитриев'},
				{img: src[1], name: 'Доронин'},
				{img: src[1], name: 'Дорофеев'},
				{img: src[1], name: 'Дроздов'},
				{img: src[1], name: 'Дьячков'},
				{img: src[1], name: 'Евдокимов'},
				{img: src[1], name: 'Евсеев'},
				{img: src[1], name: 'Егоров'},
				{img: src[1], name: 'Елисеев'},
				{img: src[1], name: 'Емельянов'},
				{img: src[1], name: 'Ермаков'},
				{img: src[1], name: 'Ершов'},
				{img: src[1], name: 'Ефимов'},
				{img: src[1], name: 'Ефремов'},
				{img: src[1], name: 'Жданов'},
				{img: src[1], name: 'Жуков'},
				{img: src[1], name: 'Журавлёв'},
				{img: src[1], name: 'Зайцев'},
				{img: src[1], name: 'Захаров'},
				{img: src[1], name: 'Зимин'},
				{img: src[1], name: 'Зиновьев'},
				{img: src[1], name: 'Зуев'},
				{img: src[1], name: 'Зыков'},
				{img: src[1], name: 'Иванов'},
				{img: src[1], name: 'Игнатов'},
				{img: src[1], name: 'Игнатьев'},
				{img: src[1], name: 'Ильин'},
				{img: src[1], name: 'Исаев'},
				{img: src[1], name: 'Исаков'},
				{img: src[1], name: 'Кабанов'},
				{img: src[1], name: 'Казаков'},
				{img: src[1], name: 'Калашников'},
				{img: src[1], name: 'Калинин'},
				{img: src[1], name: 'Капустин'},
				{img: src[1], name: 'Карпов'},
				{img: src[1], name: 'Кириллов'},
				{img: src[1], name: 'Киселёв'},
				{img: src[1], name: 'Князев'},
				{img: src[1], name: 'Ковалёв'},
				{img: src[1], name: 'Козлов'},
				{img: src[1], name: 'Колесников'},
				{img: src[1], name: 'Колобов'},
				{img: src[1], name: 'Комаров'},
				{img: src[1], name: 'Комиссаров'},
				{img: src[1], name: 'Кондратьев'},
				{img: src[1], name: 'Коновалов'},
				{img: src[1], name: 'Кононов'},
				{img: src[1], name: 'Константинов'},
				{img: src[1], name: 'Копылов'},
				{img: src[1], name: 'Корнилов'},
				{img: src[1], name: 'Королёв'},
				{img: src[1], name: 'Костин'},
				{img: src[1], name: 'Котов'},
				{img: src[1], name: 'Кошелев'},
				{img: src[1], name: 'Красильников'},
				{img: src[1], name: 'Крылов'},
				{img: src[1], name: 'Крюков'},
				{img: src[1], name: 'Кудрявцев'},
				{img: src[1], name: 'Кудряшов'},
				{img: src[1], name: 'Кузнецов'},
				{img: src[1], name: 'Кузьмин'},
				{img: src[1], name: 'Кулагин'},
				{img: src[1], name: 'Кулаков'},
				{img: src[1], name: 'Куликов'},
				{img: src[1], name: 'Лаврентьев'},
				{img: src[1], name: 'Лазарев'},
				{img: src[1], name: 'Лапин'},
				{img: src[1], name: 'Ларионов'},
				{img: src[1], name: 'Лебедев'},
				{img: src[1], name: 'Лихачёв'},
				{img: src[1], name: 'Лобанов'},
				{img: src[1], name: 'Логинов'},
				{img: src[1], name: 'Лукин'},
				{img: src[1], name: 'Лыткин'},
				{img: src[1], name: 'Макаров'},
				{img: src[1], name: 'Максимов'},
				{img: src[1], name: 'Мамонтов'},
				{img: src[1], name: 'Марков'},
				{img: src[1], name: 'Мартынов'},
				{img: src[1], name: 'Маслов'},
				{img: src[1], name: 'Матвеев'},
				{img: src[1], name: 'Медведев'},
				{img: src[1], name: 'Мельников'},
				{img: src[1], name: 'Меркушев'},
				{img: src[1], name: 'Миронов'},
				{img: src[1], name: 'Михайлов'},
				{img: src[1], name: 'Михеев'},
				{img: src[1], name: 'Мишин'},
				{img: src[1], name: 'Моисеев'},
				{img: src[1], name: 'Молчанов'},
				{img: src[1], name: 'Морозов'},
				{img: src[1], name: 'Муравьёв'},
				{img: src[1], name: 'Мухин'},
				{img: src[1], name: 'Мясников'},
				{img: src[1], name: 'Назаров'},
				{img: src[1], name: 'Наумов'},
				{img: src[1], name: 'Некрасов'},
				{img: src[1], name: 'Нестеров'},
				{img: src[1], name: 'Никитин'},
				{img: src[1], name: 'Никифоров'},
				{img: src[1], name: 'Николаев'},
				{img: src[1], name: 'Никонов'},
				{img: src[1], name: 'Новиков'},
				{img: src[1], name: 'Носков'},
				{img: src[1], name: 'Носов'},
				{img: src[1], name: 'Овчинников'},
				{img: src[1], name: 'Одинцов'},
				{img: src[1], name: 'Орехов'},
				{img: src[1], name: 'Орлов'},
				{img: src[1], name: 'Осипов'},
				{img: src[1], name: 'Павлов'},
				{img: src[1], name: 'Панов'},
				{img: src[1], name: 'Панфилов'},
				{img: src[1], name: 'Пахомов'},
				{img: src[1], name: 'Пестов'},
				{img: src[1], name: 'Петров'},
				{img: src[1], name: 'Петухов'},
				{img: src[1], name: 'Поляков'},
				{img: src[1], name: 'Пономарёв'},
				{img: src[1], name: 'Попов'},
				{img: src[1], name: 'Потапов'},
				{img: src[1], name: 'Прохоров'},
				{img: src[1], name: 'Рогов'},
				{img: src[1], name: 'Родионов'},
				{img: src[1], name: 'Рожков'},
				{img: src[1], name: 'Романов'},
				{img: src[1], name: 'Русаков'},
				{img: src[1], name: 'Рыбаков'},
				{img: src[1], name: 'Рябов'},
				{img: src[1], name: 'Савельев'},
				{img: src[1], name: 'Савин'},
				{img: src[1], name: 'Сазонов'},
				{img: src[1], name: 'Самойлов'},
				{img: src[1], name: 'Самсонов'},
				{img: src[1], name: 'Сафонов'},
				{img: src[1], name: 'Селезнёв'},
				{img: src[1], name: 'Селиверстов'},
				{img: src[1], name: 'Семёнов'},
				{img: src[1], name: 'Сергеев'},
				{img: src[1], name: 'Сидоров'},
				{img: src[1], name: 'Силин'},
				{img: src[1], name: 'Симонов'},
				{img: src[1], name: 'Ситников'},
				{img: src[1], name: 'Смирнов'},
				{img: src[1], name: 'Соболев'},
				{img: src[1], name: 'Соколов'},
				{img: src[1], name: 'Соловьёв'},
				{img: src[1], name: 'Сорокин'},
				{img: src[1], name: 'Степанов'},
				{img: src[1], name: 'Стрелков'},
				{img: src[1], name: 'Субботин'},
				{img: src[1], name: 'Суворов'},
				{img: src[1], name: 'Суханов'},
				{img: src[1], name: 'Сысоев'},
				{img: src[1], name: 'Тарасов'},
				{img: src[1], name: 'Терентьев'},
				{img: src[1], name: 'Тетерин'},
				{img: src[1], name: 'Тимофеев'},
				{img: src[1], name: 'Титов'},
				{img: src[1], name: 'Тихонов'},
				{img: src[1], name: 'Третьяков'},
				{img: src[1], name: 'Трофимов'},
				{img: src[1], name: 'Туров'},
				{img: src[1], name: 'Уваров'},
				{img: src[1], name: 'Устинов'},
				{img: src[1], name: 'Фадеев'},
				{img: src[1], name: 'Федосеев'},
				{img: src[1], name: 'Федотов'},
				{img: src[1], name: 'Филатов'},
				{img: src[1], name: 'Филиппов'},
				{img: src[1], name: 'Фокин'},
				{img: src[1], name: 'Фомин'},
				{img: src[1], name: 'Фомичёв'},
				{img: src[1], name: 'Фролов'},
				{img: src[1], name: 'Фёдоров'},
				{img: src[1], name: 'Харитонов'},
				{img: src[1], name: 'Хохлов'},
				{img: src[1], name: 'Цветков'},
				{img: src[1], name: 'Чернов'},
				{img: src[1], name: 'Шарапов'},
				{img: src[1], name: 'Шаров'},
				{img: src[1], name: 'Шашков'},
				{img: src[1], name: 'Шестаков'},
				{img: src[1], name: 'Шилов'},
				{img: src[1], name: 'Ширяев'},
				{img: src[1], name: 'Шубин'},
				{img: src[1], name: 'Щербаков'},
				{img: src[1], name: 'Щукин'},
				{img: src[1], name: 'Юдин'},
				{img: src[1], name: 'Яковлев'},
				{img: src[1], name: 'Якушев'}
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
			if (val === '\\') {
				this.state = 'tree'
			}
			if (val === '=') {
				this.state = 'role'
			}
		}
	},
	computed: {
		pers () {
			if (this.state === 'name') {
				return this.persons
			}
			if (this.state === 'role') {
				return this.roles
			}
			// else return this.persons
		}
	},
	methods: {
		onChange () {
			this.$emit('input', this.selected)
		},

		remove (item) {
			const index = this.selected.indexOf(item.name)
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

<template lang="pug">
drag-it-dude(v-on:dblclick.native="expand" :class="assignClass")
	.top
		span создать:
		span(v-if="true") {{ type }}
		v-icon(@click="minimize") minimize
		v-icon(v-if="expanded !==2" @click="expand") call_made
		v-icon(v-if='expanded === 2' @click="expand") call_received
		v-icon(@click="closePop").close close
	v-layout(column justify-start )
		v-flex(xs12)
			v-layout(row v-if="expanded !==0" )
				v-flex(xs6)
					v-select(label="Тип" :items="types" v-model="type" ).mx-3
				v-flex(xs4)
					v-checkbox( v-model="controler" label="На контроле" color="primary" hide-details )
			drop(@drop="handleDrop" @dragover="over = true" @mousedown.native.stop @dragleave="over = false" class="drop" :class="{ over }")
				UserSelect(label="Исполнители" v-on:dblclick.native.stop  v-model="fio" )
			drop(v-if="controler" @drop="handleDrop1" @mousedown.native.stop @dragover="over1 = true" @dragleave="over1 = false" class="drop" :class="{ over1 }")
				UserSelect(label="Контролер" v-on:dblclick.native.stop  v-model="fio1" )
			v-text-field(type='text' class="mx-3" label="Тема" @mousedown.native.stop v-model='theme' required )
			v-textarea(v-if="expanded === 0" class="mx-3 mt-0" label="Содержание" @mousedown.native.stop v-model="description" height="30")
			v-textarea(v-else class="mx-3 mt-0" label="Содержание"  height="100" v-model="description")
			v-layout( row align-center class="mx-3" )
				.rel.mr-5
					.label Дней на исполнение
					v-layout(row align-center )
						v-btn( flat icon @click="minus" )
							v-icon remove
						input(type="text" size="25" :value="days" id="count" placeholder="Дни")
						v-btn( flat icon  @click="plus")
							v-icon add
				v-flex
					v-menu(ref="menu"
					:close-on-content-click="true"
					v-model="menu" :nudge-right="30"
					:return-value.sync="date" lazy transition="scale-transition"
					max-width="290px" min-width="290px"
					offset-y full-width )
						v-text-field(slot="activator" v-model="date" label="Срок исполнения" prepend-icon="event" readonly)
						v-date-picker(v-model="date" @input="$refs.menu.save(date)" scrollable locale="ru-ru")
				template(v-if="expanded === 2")
					v-btn(flat ) Конец недели
					v-btn(flat ) След.понедельник
					v-btn(flat ) Конец месяца
					v-btn(flat ) Конец квартала
			div(v-if="expanded === 1")
				v-btn(flat ) Конец недели
				v-btn(flat ) След.понедельник
				v-btn(flat ) Конец месяца
				v-btn(flat ) Конец квартала
			v-btn(flat) Файлы
			v-card-actions
				<!-- v&#45;btn(flat color="orange" @click="$store.commit('closeAddTask')") Отмена -->
				v-btn(flat color="orange" @click="resetForm") Очистить
				v-btn(flat color="orange") Отправить

	.favusers
		v-layout(row)
			v-tooltip(left v-for="user in favorites" :key="user.id" )
				drag(class="drag" :transfer-data="user.name" @mousedown.native.stop slot="activator")
					v-list-tile-avatar
						img(:src="require('@/assets/img/user0.svg')").av
				span {{ user.name }}
			v-tooltip(left)
				drag(@mousedown.native.stop slot="activator" :transfer-data="group1")
					v-list-tile-avatar
						img(:src="require('@/assets/img/users.svg')").av
				span Бухгалтерия
			v-tooltip(left)
				drag(@mousedown.native.stop slot="activator" :transfer-data="group2")
					v-list-tile-avatar
						img(:src="require('@/assets/img/users.svg')").av
				span Кадры
	.favstars
		v-layout( column )
			v-tooltip(left v-for="(star, index) in stars" :key="index")
				div(slot="activator" :class="star.class")
					i.icon-star-full(v-if="star.name !=='Пусто'" @mouseup="loadSlot(index)" v-longpress="saveSlot")
					i.icon-star-empty(v-if="star.name ==='Пусто'" @mousedown='setSlot(index)' v-longpress="saveSlot")
				span {{star.name}}
	v-fade-transition
		.save(v-if="save")
			v-container( fill-height )
				v-layout(flex align-center justify-center)
					div
						h1 Слот {{  currentSlot + 1  }}
						h2 Сохранить шаблон?
						p Все значения в слоте будут обновлены.
						v-text-field(label="Название" solo placeholder="Введите название" v-model='name' autofocus)
						v-btn(flat dark @click="save = false") Отмена
						v-btn(flat dark @click="saving") Сохранить

						v-btn(flat icon dark).del
							v-icon delete
</template>

<script>
import DragItDude from 'vue-drag-it-dude'
import UserSelect from '@/components/UserSelect'
import * as Longpress from '@/directives/longpress-directive'

export default {
	data () {
		return {
			expanded: 0,
			selected: null,
			date: '2018-11-12',
			menu: null,
			theme: null,
			search: '',
			days: 3,
			over: false,
			over1: false,
			draggable: 'Drag me',
			type: 'На исполнение',
			fio: [],
			fio1: [],
			description: '',
			controler: false,
			save: false,
			currentSlot: null,
			name: '',
			types: [
				'На исполнение',
				'На исполнение c контролем',
				'На ознакомление',
				'На согласование',
				'Группа заданий',
				'Документ'
			],
			stars: [
				{
					id: 0,
					class: '',
					name: 'На исполнение',
					type: 'На исполнение',
					theme: 'Подготовить презентацию',
					description: 'Прошу подготовить презентацию для показа клиентам',
					fio: ['Фролов'],
					fio1: []
				},
				{
					id: 1,
					class: '',
					name: 'На ознакомление',
					type: 'На ознакомление',
					fio: ['Попов', 'Рябов', 'Титов', 'Шарапов'],
					fio1: [],
					theme: 'Квартальный отчет',
					description: 'Прошу подготовить отчет за текущий квартал'
				},
				{
					id: 2,
					class: '',
					name: 'Контроль',
					controler: true,
					type: 'На исполнение c контролем',
					fio: ['Аксёнов', 'Денисов'],
					fio1: ['Маслов'],
					theme: 'Цели сотрудников по отделам',
					description: 'Промежуточные цели, уточнение формулировок'
				},
				{id: 3, class: '', name: 'Пусто', fio: [], fio1: []},
				{id: 4, class: '', name: 'Пусто', fio: [], fio1: []},
				{id: 5, class: '', name: 'Пусто', fio: [], fio1: []},
				{id: 6, class: '', name: 'Пусто', fio: [], fio1: []},
				{id: 7, class: '', name: 'Пусто', fio: [], fio1: []},
				{id: 8, class: '', name: 'Пусто', fio: [], fio1: []},
				{id: 9, class: '', name: 'Пусто', fio: [], fio1: []},
				{id: 10, class: '', name: 'Пусто', fio: [], fio1: []}
			],
			favorites: [
				{id: 0, name: 'Беспалов'},
				{id: 1, name: 'Гордеев'},
				{id: 2, name: 'Евдокимов'},
				{id: 3, name: 'Карпов'},
				{id: 4, name: 'Морозов'},
				{id: 5, name: 'Фомин'}
			]
		}
	},
	created () {
		if (this.restore) {
			this.setForm()
		}
	},
	computed: {
		restore () {
			return this.$store.getters.restore
		},
		slot0 () {
			let form = {}
			form.fio = this.fio
			form.fio1 = this.fio1
			form.type = this.type
			form.controler = this.controler
			form.theme = this.theme
			form.description = this.description
			form.name = this.name
			return form
		},
		group1 () {
			let one = [ 'Абрамов', 'Авдеев' ]
			return [...one]
		},
		group2 () {
			let one = [ 'Беспалов', 'Бирюков', 'Блинов', 'Блохин', 'Бобров' ]
			return [...one]
		},
		addTask () {
			return this.$store.getters.addTask
		},
		assignClass () {
			if (this.expanded === 1) { return 'tall' } else if (this.expanded === 2) { return 'centr' }
		}
	},
	components: {
		DragItDude,
		UserSelect,
		Longpress
	},
	methods: {
		saving () {
			let e = this.currentSlot
			let b = this.slot0
			this.stars[e].name = b.name
			this.stars[e].theme = b.theme
			this.stars[e].type = b.type
			this.stars[e].controler = b.controler
			this.stars[e].fio.push(...b.fio)
			this.stars[e].fio1.push(...b.fio1)
			this.stars[e].description = b.description
			this.save = false
		},
		setSlot (e) {
			this.currentSlot = e
		},
		saveSlot () {
			this.save = true
		},
		setForm () {
			let obj = this.$store.getters.slot0
			this.fio = obj.fio
			this.fio1 = obj.fio1
			this.theme = obj.theme
			this.type = obj.type
			this.description = obj.description
			this.name = obj.name
		},
		resetForm (e) {
			this.fio.splice(0, this.fio.length)
			this.fio1.splice(0, this.fio1.length)
			this.theme = ''
			this.type = 'На исполнение'
			this.description = ''
			this.currentSlot = e
		},
		loadSlot (e) {
			this.resetForm()
			this.stars.map((star) => { star.class = '' })
			if (this.stars[e].name !== 'Пусто') {
				this.stars[e].class = 'active'
			}
			this.type = this.stars[e].type
			this.controler = this.stars[e].controler
			this.fio.push(...this.stars[e].fio)
			this.fio1.push(...this.stars[e].fio1)
			this.theme = this.stars[e].theme
			this.description = this.stars[e].description
			this.name = this.stars[e].name
			this.currentSlot = e
		},
		plus () {
			this.days++
		},
		minus () {
			this.days--
		},
		expand () {
			if (this.expanded === 0) { this.expanded = 1 } else if (this.expanded === 1) { this.expanded = 2 } else if (this.expanded === 2) { this.expanded = 0 }
		},
		closePop () {
			this.$store.commit('unsetRestore')
			this.$store.commit('closeAddTask')
		},
		minimize () {
			this.$store.commit('setRestore')
			this.$store.commit('setSlot0', this.slot0)
			this.$store.commit('toggleAddTask')
			this.$store.commit('toggleMin')
			console.log(this.slot0)
		},
		handleDrop (data, event) {
			if (Array.isArray(data)) {
				this.fio.push(...data)
				this.over = false
			} else {
				this.fio.push(data)
				this.over = false
			}
		},
		handleDrop1 (data, event) {
			if (Array.isArray(data)) {
				this.fio1.push(...data)
				this.over1 = false
			} else {
				this.fio1.push(data)
				this.over1 = false
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.drag-it-dude {
	width: var(--sm);
	height: var(--sm);
	background: #fff;
	z-index: 3;
	position: fixed;
	left: initial;
	top: initial;
	right: 0;
	bottom: 0;
	box-shadow: 0 0 15px #00000033;
	.top {
		position: ablsolute;
		top: 0;
		right: 0;
		text-align: right;
		background: $info;
		span {
			font-size: .9rem;
			text-transform: uppercase;
			float: left;
			color: #fff;
			padding: .2rem .5rem;
			background: $info;
		}
		i {
			color: #fff;
			cursor: pointer;
			padding: .5rem;
			display: inline-block;
			font-size: .97rem;
			&:hover {
				background: lighten($info, 20%);
			}
		}
	}
}

.tall {
	height: 93vh;
}
.centr {
	position: ablsolute;
	top: 7%;
	bottom: 5%;
	left: 10%;
	right: 10%;
	width: 80%;
	height: 88%;
}

.favusers {
	position: absolute;
	top: -50px;
	left: 0;
}

.drag {
	cursor: move;
}
.drop.over, .drop.over1 {
	background: #eaf9d7;
}

.av {
	background: $grey;
}

#count {
	font-size: 1.3rem;
	text-align: center;
	max-width: 50px;
	height: 32px;
}
.increment {
	font-size: 3rem;
}
.label {
	font-size: .9rem;
	position: absolute;
	top: -10px;
	left: 20px;
	color: #666;
}
.rel {
	position: relative;
}

.v-card__actions {
	position: absolute;
	bottom: 1rem;
	left: 0;
}

.favstars {
	position: absolute;
	top: 0;
	left: -39px;
	height: 100%;
	background: #000000aa;
	.active {
		background: $info;
		i { color: #fff; }
	}
	i {
		font-size: 1.92rem;
		cursor: pointer;
		color: #fff;
	}
}
.save {
	width: 100%;
	height: 100%;
	background: #0d4188de;
	z-index: 3;
	position: absolute;
	top: 0;
	left: 0;
	color: #fff;
	div {
		margin: 0 auto;
		h2 {
			font-weight: 400;
			margin-bottom: 1rem;
		}
	}
}

.del {
	position: absolute;
	bottom: 2rem;
	left: 2rem;
	opacity: .5;
	&:hover {
		opacity: 1;
	}
	i {
		font-size: 3rem;
	}
}
</style>

<template lang="pug">
vue-draggable-resizable( v-on:resizing="onResize"
	v-on:dragging="onDrag"
	:active="active"
	:z="3"
	:w="startW" :h="startH"
	:x="startX" :y="startY"
	:draggable="draggable"
	).add
	.top
		span создать:
		span(v-if="true") {{ type }}
		v-icon(@click="minimize") minimize
		v-icon(v-if="expanded !==1" @click="expand") call_made
		v-icon(v-if='expanded === 1' @click="expand") call_received
		v-icon(@click="closePop").close close
	h1 {{ expanded }}
	<!-- v&#45;layout(column justify&#45;start ) -->
	<!-- 	v&#45;flex(xs12) -->
	<!-- 		v&#45;layout(row v&#45;if="expanded !==0" ) -->
	<!-- 			v&#45;flex(xs6) -->
	<!-- 				v&#45;select(label="Тип" :items="types" v&#45;model="type" ).mx&#45;3 -->
	<!-- 			v&#45;flex(xs4) -->
	<!-- 				v&#45;checkbox( v&#45;model="controler" label="На контроле" color="primary" hide&#45;details ) -->
	<!-- 		drop(@drop="handleDrop" @dragover="over = true" @mousedown.native.stop @dragleave="over = false" class="drop" :class="{ over }") -->
	<!-- 			UserSelect(label="Исполнители" v&#45;on:dblclick.native.stop  v&#45;model="fio" ) -->
	<!-- 		drop(v&#45;if="controler" @drop="handleDrop1" @mousedown.native.stop @dragover="over1 = true" @dragleave="over1 = false" class="drop" :class="{ over1 }") -->
	<!-- 			UserSelect(label="Контролер" v&#45;on:dblclick.native.stop  v&#45;model="fio1" ) -->
	<!-- 		v&#45;text&#45;field(type='text' class="mx&#45;3" label="Тема" @mousedown.native.stop v&#45;model='theme' required ) -->
	<!-- 		v&#45;textarea(class="mx&#45;3 my&#45;0" label="Содержание" auto&#45;grow @mousedown.native.stop v&#45;model="description" rows=1) -->
	<!-- 		v&#45;layout( row align&#45;center ).mx&#45;3 -->
	<!-- 			.mr&#45;5(v&#45;if="expanded === 2") -->
	<!-- 				v&#45;menu(ref="menu3" -->
	<!-- 				:close&#45;on&#45;content&#45;click="!hours" -->
	<!-- 				v&#45;model="menu3" :nudge&#45;right="30" -->
	<!-- 				lazy transition="scale&#45;transition" -->
	<!-- 				offset&#45;y full&#45;width ) -->
	<!-- 					v&#45;text&#45;field(slot="activator" :value="displayDate" label="Начать" prepend&#45;icon="event" readonly).month -->
	<!-- 					v&#45;layout( row ) -->
	<!-- 						v&#45;date&#45;picker(v&#45;model="startDate" scrollable locale="ru&#45;Ru" first&#45;day&#45;of&#45;week=1) -->
	<!-- 						v&#45;time&#45;picker(v&#45;model="time0" v&#45;if="hours") -->
	<!-- 					v&#45;layout( row justify&#45;center v&#45;if="hours") -->
	<!-- 						v&#45;btn(flat color="success" @click="menu3 = false") Отмена -->
	<!-- 						v&#45;btn(flat color="success" @click="$refs.menu3.save(displayDate)") OK -->
	<!-- 			.mr&#45;5 -->
	<!-- 				DayCounter(days="days") -->
	<!-- 			.mr&#45;5 -->
	<!-- 				v&#45;menu(ref="menu" -->
	<!-- 				:close&#45;on&#45;content&#45;click="!hours" -->
	<!-- 				v&#45;model="menu" :nudge&#45;right="30" -->
	<!-- 				:return&#45;value.sync="endDate" -->
	<!-- 				lazy transition="scale&#45;transition" -->
	<!-- 				offset&#45;y full&#45;width ) -->
	<!-- 					v&#45;text&#45;field(slot="activator" :value="endDate" label="Завершить" prepend&#45;icon="event" readonly).month -->
	<!-- 					v&#45;layout( row ) -->
	<!-- 						v&#45;date&#45;picker(v&#45;model="date1" scrollable locale="ru&#45;Ru" first&#45;day&#45;of&#45;week=1 @input="saveDate") -->
	<!-- 						v&#45;time&#45;picker(v&#45;model="time" v&#45;if="hours") -->
	<!-- 					v&#45;layout( row justify&#45;center  v&#45;if="hours") -->
	<!-- 						v&#45;btn(flat color="success" @click="menu = false") Отмена -->
	<!-- 						v&#45;btn(flat color="success" @click="menu = false") OK -->
	<!-- 			v&#45;layout(row v&#45;if="fio.length > 1 &#38;&#38; expanded === 2") -->
	<!-- 				.mx&#45;3 -->
	<!-- 					v&#45;btn&#45;toggle(v&#45;model="sequence" ).switch -->
	<!-- 						v&#45;btn(flat value="1") Параллельно -->
	<!-- 						v&#45;btn(flat value="2" ) Последовательно -->
	<!-- 		userTable( :items="fio" :hours="hours" v&#45;if="fio.length > 1" @mousedown.native.stop).my&#45;3 -->
	<!-- 		v&#45;slider(@mousedown.native.stop) -->
	<!-- 		v&#45;layout(row @mousedown.native.stop) -->
	<!-- 			drag&#45;zone.zone -->
	<!-- 				drag&#45;content.content.c1 -->
	<!-- 					.item item 1 -->
	<!-- 				drag&#45;handle.handle(@mousedown.native.stop) -->
	<!-- 					div -->
	<!-- 				drag&#45;content.content.c2 -->
	<!-- 					.item item 2 -->
	<!-- 		v&#45;btn(flat) Файлы -->
	<!-- 		v&#45;card&#45;actions -->
	<!-- 			v&#45;btn(flat color="orange" @click="resetForm") Очистить -->
	<!-- 			v&#45;btn(flat color="orange") Отправить -->
	<!-- .favusers -->
	<!-- 	v&#45;layout(row) -->
	<!-- 		v&#45;tooltip(left v&#45;for="user in favorites" :key="user.id" ) -->
	<!-- 			drag(class="drag" :transfer&#45;data="user.name" @mousedown.native.stop slot="activator") -->
	<!-- 				v&#45;list&#45;tile&#45;avatar -->
	<!-- 					img(:src="require('@/assets/img/user0.svg')").av -->
	<!-- 			span {{ user.name }} -->
	<!-- 		v&#45;tooltip(left) -->
	<!-- 			drag(@mousedown.native.stop slot="activator" :transfer&#45;data="group1") -->
	<!-- 				v&#45;list&#45;tile&#45;avatar -->
	<!-- 					img(:src="require('@/assets/img/users.svg')").av -->
	<!-- 			span Бухгалтерия -->
	<!-- 		v&#45;tooltip(left) -->
	<!-- 			drag(@mousedown.native.stop slot="activator" :transfer&#45;data="group2") -->
	<!-- 				v&#45;list&#45;tile&#45;avatar -->
	<!-- 					img(:src="require('@/assets/img/users.svg')").av -->
	<!-- 			span Кадры -->
	<!-- .favstars -->
	<!-- 	v&#45;layout( column ) -->
	<!-- 		v&#45;tooltip(left v&#45;for="(star, index) in stars" :key="index") -->
	<!-- 			div(slot="activator" :class="star.class") -->
	<!-- 				i.icon&#45;star&#45;full(v&#45;if="star.name !=='Пусто'" @mouseup="loadSlot(index)" v&#45;longpress="saveSlot") -->
	<!-- 				i.icon&#45;star&#45;empty(v&#45;if="star.name ==='Пусто'" @mousedown='setSlot(index)' v&#45;longpress="saveSlot") -->
	<!-- 			span {{star.name}} -->
	<!-- v&#45;fade&#45;transition -->
	<!-- 	.save(v&#45;if="save") -->
	<!-- 		v&#45;container( fill&#45;height ) -->
	<!-- 			v&#45;layout(flex align&#45;center justify&#45;center) -->
	<!-- 				div -->
	<!-- 					h1 Слот {{  currentSlot + 1  }} -->
	<!-- 					h2 Сохранить шаблон? -->
	<!-- 					p Все значения в слоте будут обновлены. -->
	<!-- 					v&#45;text&#45;field(label="Название" solo placeholder="Введите название" v&#45;model='name' autofocus) -->
	<!-- 					v&#45;btn(flat dark @click="save = false") Отмена -->
	<!-- 					v&#45;btn(flat dark @click="saving") Сохранить -->
	<!-- 					v&#45;btn(flat icon dark).del -->
	<!-- 						v&#45;icon delete -->
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import UserSelect from '@/components/UserSelect'
import userTable from '@/components/userTable'
import * as Longpress from '@/directives/longpress-directive'
import DayCounter from '@/components/form/DayCounter'

export default {
	data () {
		return {
			width: 0,
			height: 0,
			x: 0,
			y: 0,
			startW: 450,
			startH: 450,
			active: true,
			draggable: true,
			expanded: 0,
			menu: false,
			menu2: false,
			menu3: false,
			menu4: false,
			time: '19:00',
			time0: '10:00',
			theme: null,
			search: '',
			over: false,
			over1: false,
			sequence: '1',
			type: 'На исполнение',
			date1: null,
			startDate: '2018-11-12',
			fio: ['Иванов', 'Петров'],
			// fio: [],
			fio1: [],
			description: '',
			controler: false,
			save: false,
			currentSlot: null,
			name: '',
			types: [
				'На исполнение', 'На исполнение c контролем', 'На ознакомление', 'На согласование', 'Группа заданий', 'Документ'
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
	mounted () {
		if (this.restore) {
			this.setForm()
		}
	},
	computed: {
		startX () {
			let w = window.innerWidth
			return (w - 450)
		},
		startY () {
			let w = window.innerHeight
			return (w - 450)
		},
		hours () {
			return this.$store.getters.hours
		},
		displayDate () {
			return this.hours ? this.startDate + '   ' + this.time0 : this.startDate
		},
		days () {
			return this.$store.getters.duration
		},
		endDate: {
			get: function () {
				let now = this.startDate.split('-')
				let formatted = now[0] + '-' + now[1] + '-' + (parseInt(now[2]) + this.days)
				// eslint-disable-next-line
				this.date1 = formatted
				return this.hours ? formatted + '   ' + this.time : formatted
			},
			set: function (newValue) { }
		},
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
		}
	},
	components: {
		VueDraggableResizable,
		UserSelect,
		Longpress,
		userTable,
		DayCounter
	},
	methods: {
		onResize: function (x, y, width, height) {
			this.x = x
			this.y = y
			this.width = width
			this.height = height
		},
		onDrag: function (x, y) {
			this.x = x
			this.y = y
		},
		expand () {
			if (this.expanded === 0) {
				this.expanded = 1
				let box = document.querySelector('.add')
				box.style.top = '60px'
				box.style.height = (window.innerHeight - 60) + 'px'
				box.style.width = '93%'
				box.style.left = '5%'
				box.style.right = '2%'
				this.active = false
				this.draggable = false
			} else {
				this.expanded = 0
				let box = document.querySelector('.add')
				box.style.height = '450px'
				box.style.width = '450px'
				box.style.left = 'initial'
				box.style.top = 'initial'
				box.style.right = '0'
				box.style.bottom = '0'
				this.active = false
				this.draggable = true
			}
		},
		textareaResize () {
			this.$refs.textarea.style.minHeight = this.$refs.textarea.scrollHeight + 'px'
		},
		doNothing (evt) {
			evt.stopPropagation()
		},
		saveDate () {
			let nowDays = this.startDate.split('-')[2]
			let toDays = this.date1.split('-')[2]
			let days = toDays - nowDays
			this.$store.commit('setDuration', days)
			this.endDate = this.date1 + '   ' + this.time
		},
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

.add {
	background: #fff;
	position: fixed;
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

/* .tall { */
/* 	height: 93vh; */
/* } */
/* .centr { */
/* 	position: ablsolute; */
/* 	top: 7%; */
/* 	bottom: 5%; */
/* 	left: 10%; */
/* 	right: 10%; */
/* 	width: 80%; */
/* 	height: 88%; */
/* } */

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

.desktope .card-content {
	margin: 1rem;
	width: 100%;
	display: flex;
	align-items: center;
	.head {
		font-size: 1rem;
		flex-grow: 1;
		/* color: $secondary; */
	}
	.fio {
		width: 130px;
		overflow: hidden;
	}
	.date {
		margin: 0 1.5rem;
		overflow: hidden;
	}
	.state {
		color: orange;
		text-transform: uppercase;
		font-size: .8rem;
		overflow: hidden;
	}
	.some { display: none; }
}

.moving {
	background: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
	font-family: Roboto;
	color: #000;
	line-height: 170%;
	z-index: 5;
}
.v-btn-toggle--selected {
	box-shadow: none;
}
.counter {
	font-size: .8rem;
	line-height: 0;
	margin-top: 1rem;
	cursor: pointer;
	i {
		color: #ccc;
		&:hover {
			color: #222;
		}
	}
}
.switch {
	border: 1px solid #133C60;
	.v-btn--active { background: #133C60; color: #fff; }

}

.v-menu__content {
	background: #fff;
}

/deep/ .v-time-picker-title__time .v-picker__title__btn, /deep/ .v-time-picker-title__time  span {
	font-size: 56px;
	height: 56px;
}

.zone {
	width: 100%;
	height: 30px;
	margin: 0 auto;
	position: relative;
	clear: both;
	display: flex;
	.handle {
		width: 10px;
		div {
			width:8px;
			height: 100%;
			transform: translateX(3px);
		}
		&:hover {
			div { border-left: 3px dotted #333; }
		}
	}
	.content {
		width: calc((100% - 17px)/2);
		overflow: auto;
		background: #ccc;
	}
}
</style>

<template lang="pug">
vue-drag-resize( ref="add" v-on:resizing="resize" v-on:dragging="resize"
	:isActive="true"
	:z="3"
	:w="startW" :h="startH"
	:x="startX" :y="startY"
	:isDraggable="draggable"
	:isResizable="resizable"
	@dblclick.native="expand"
	).add
	drop( @dragover="over = true" @dragleave="over = false").scroll
		.top
			span создать:
			span(v-if="true") {{ type }}
			v-icon(@click="minimize") minimize
			v-icon(v-if="expanded !== 1" @click="expand") call_made
			v-icon(v-if='expanded === 1' @click="expand") call_received
			v-icon(@click="closePop").close close
		#tip(v-show="hint")
		div(v-if="!userDrag && !tableDrag")
			drop(@drop="handleFiles"
				class="dropFiles"
				:class="{ over }"
				)
				v-layout( align-center justify-center column fill-height )
					img(:src="require('@/assets/img/mainfile.svg')")
					h1 Основные файлы
		div(v-if="!userDrag && !tableDrag")
			drop(@drop="handleFiles"
				class="dropFiles1"
				:class="{ over }"
				)
				v-layout( align-center justify-center column fill-height )
					img(:src="require('@/assets/img/dopfile.svg')")
					h1 Дополнительные файлы
		div(v-if="userDrag")
			drop(@drop="handleUserDrop"
				class="dropUser"
				:class="{ over }"
				)
				v-layout( align-center justify-center column fill-height )
					img(:src="require('@/assets/img/ispoln.svg')")
					h1 Исполнители
		div(v-if="userDrag")
			drop(@drop="handleControlerDrop"
				class="dropUser1"
				:class="{ over }"
				)
				v-layout( align-center justify-center column fill-height )
					img(:src="require('@/assets/img/controler.svg')")
					h1 Контролер
		v-layout(column justify-start ).mt-5
			v-flex(xs12)
				v-layout(row v-if="expanded !==0" )
					.topform
						v-select(label="Тип" :items="types" v-model="type" ).mx-3
						v-checkbox( v-model="controler" label="На контроле" color="primary" hide-details)
						v-checkbox( label="Требуется приемка" color="primary" hide-details )
				UserSelect(label="Исполнители" v-on:dblclick.native.stop  v-model="fio" )
				v-layout( row align-center v-if="controler" )
					UserSelect(label="Контролер"  v-model="fio1" )
					.ml-3
						v-menu(ref="menu4"
						:close-on-content-click="!hours"
						v-model="menu4" :nudge-right="30"
						lazy transition="scale-transition"
						offset-y full-width )
							v-text-field(slot="activator" :value="endDate" label="Срок контроля" prepend-icon="event" readonly).pt-4
							v-layout( row )
								v-date-picker(v-model="startDate" scrollable locale="ru-Ru" first-day-of-week=1)
								v-time-picker(v-model="time0" v-if="hours")
							v-layout( row justify-center v-if="hours")
								v-btn(flat color="success" @click="menu3 = false") Отмена
								v-btn(flat color="success" @click="$refs.menu3.save(displayDate)") OK

				v-text-field(type='text' class="mx-3" label="Тема" @mousedown.native.stop v-model='theme' required )
				v-textarea(class="mx-3 my-0" label="Содержание"
					auto-grow @mousedown.native.stop
					v-model="description" rows=1
					)
				v-layout( row align-center ).mx-3
					.mr-5(v-if="expanded === 1")
						v-menu(ref="menu3"
						:close-on-content-click="!hours"
						v-model="menu3" :nudge-right="30"
						lazy transition="scale-transition"
						offset-y full-width )
							v-text-field(slot="activator" :value="displayDate" label="Начать" prepend-icon="event" readonly)
							v-layout( row )
								v-date-picker(v-model="startDate" scrollable locale="ru-Ru" first-day-of-week=1)
								v-time-picker(v-model="time0" v-if="hours")
							v-layout( row justify-center v-if="hours")
								v-btn(flat color="success" @click="menu3 = false") Отмена
								v-btn(flat color="success" @click="$refs.menu3.save(displayDate)") OK
					.mr-5
						DayCounter(days="days")
					.mr-5
						v-menu(ref="menu"
						:close-on-content-click="!hours"
						v-model="menu" :nudge-right="30"
						:return-value.sync="endDate"
						lazy transition="scale-transition"
						offset-y full-width )
							v-text-field(slot="activator" :value="endDate" label="Завершить" prepend-icon="event" readonly)
							v-layout( row )
								v-date-picker(v-model="date1" scrollable locale="ru-Ru" first-day-of-week=1 @input="saveDate")
								v-time-picker(v-model="time" v-if="hours")
							v-layout( row justify-center  v-if="hours")
								v-btn(flat color="success" @click="menu = false") Отмена
								v-btn(flat color="success" @click="menu = false") OK
					v-layout(row v-if="fio.length > 1 && expanded === 1")
						.mx-3
							v-btn-toggle(v-model="sequence" ).switch
								v-btn(flat value="par") Параллельно
								v-btn(flat value="pos" ) Последовательно
				userTable(
					:items="fio"
					:hours="hours"
					:sequence="sequence"
					:expanded="expanded"
					v-if="fio.length > 1"
					@tableon="tableDrag = 1"
					@tableoff="tableDrag = null"
					).my-3
				v-btn(flat @click="attachFiles" ) Файлы
				input(ref="file" type="file" style="display: none")
				v-slide-y-transition
					contextFiles(v-if="context === true")
				v-card-actions.act
					v-btn(flat color="orange" @click="resetForm") Очистить
					v-btn(flat color="orange" ) Отправить

	.favusers
		v-layout(row)
			v-tooltip(left v-for="user in favorites" :key="user.id" )
				drag(class="drag"
					:transfer-data="user.name"
					@mousedown.native.stop
					slot="activator"
					@dragstart="userDrag = 1"
					@dragend="userDrag = null"
					)
					v-list-tile-avatar
						img(:src="require('@/assets/img/user0.svg')").av
				span {{ user.name }}
			v-tooltip(left)
				drag(@mousedown.native.stop slot="activator" :transfer-data="group1"
					@dragstart="userDrag = 1"
					@dragend="userDrag = null"
				)
					v-list-tile-avatar
						img(:src="require('@/assets/img/users.svg')").av
				span Бухгалтерия
			v-tooltip(left)
				drag(@mousedown.native.stop slot="activator" :transfer-data="group2"
					@dragstart="userDrag = 1"
					@dragend="userDrag = null"
				)
					v-list-tile-avatar
						img(:src="require('@/assets/img/users.svg')").av
				span Кадры

	.favstars
		v-layout( column )
			.slots(left v-for="(star, index) in stars" :key="index")
				div(ref="tip" slot="activator" :class="star.class" @mouseover="showTip(star.name)" @mouseleave='hideTip')
					i.icon-star-full(v-if="star.name !=='<Пусто>'" @mouseup="loadSlot(index)" v-longpress="saveSlot")
					i.icon-star-empty(v-if="star.name ==='<Пусто>'" @mousedown='setSlot(index)' v-longpress="saveSlot")

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
import VueDragResize from 'vue-drag-resize'
import UserSelect from '@/components/UserSelect'
import userTable from '@/components/userTable'
import * as Longpress from '@/directives/longpress-directive'
import DayCounter from '@/components/form/DayCounter'
import contextFiles from '@/components/contextFiles'

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
			resizable: true,
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
			sequence: 'par',
			type: 'На исполнение',
			date1: null,
			startDate: '2018-11-12',
			fio: [],
			fio1: [],
			description: '',
			controler: false,
			save: false,
			currentSlot: null,
			name: '',
			hint: false,
			userDrag: null,
			tableDrag: null,
			context: false,
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
				{id: 3, class: '', name: '<Пусто>', fio: [], fio1: []},
				{id: 4, class: '', name: '<Пусто>', fio: [], fio1: []},
				{id: 5, class: '', name: '<Пусто>', fio: [], fio1: []},
				{id: 6, class: '', name: '<Пусто>', fio: [], fio1: []},
				{id: 7, class: '', name: '<Пусто>', fio: [], fio1: []},
				{id: 8, class: '', name: '<Пусто>', fio: [], fio1: []},
				{id: 9, class: '', name: '<Пусто>', fio: [], fio1: []},
				{id: 10, class: '', name: '<Пусто>', fio: [], fio1: []}
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
			if (this.expanded === 0) {
				return (w - 450)
			} else return 90
		},
		startY () {
			let w = window.innerHeight
			if (this.expanded === 0) {
				return (w - 450)
			} else return 60
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
		VueDragResize,
		UserSelect,
		Longpress,
		userTable,
		DayCounter,
		contextFiles
	},
	methods: {
		attachFiles () {
			if (event.shiftKey) {
				this.$refs.file.click()
			} else {
				this.context = !this.context
			}
		},
		handleFiles (data, event) {
			event.preventDefault()
			const files = event.dataTransfer.files
			const filenames = []
			for (let i = 0; i < files.length; i++) {
				filenames.push(files.item(i).name)
			}
			this.over = false
			alert(`You dropped files: ${JSON.stringify(filenames)}`)
		},
		showTip (e) {
			let tip = document.querySelector('#tip')
			tip.innerHTML = e
			this.hint = true
		},
		hideTip () {
			this.hint = false
		},
		resize (newRect) {
			this.width = newRect.width
			this.height = newRect.height
			this.top = newRect.top
			this.left = newRect.left
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
				box.style.left = '6%'
				box.style.right = '1%'
				this.active = false
				this.draggable = false
				this.resizable = false
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
				this.resizable = true
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
			if (this.stars[e].name !== '<Пусто>') {
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
		handleUserDrop (data, event) {
			if (Array.isArray(data)) {
				this.fio.push(...data)
				this.over = false
			} else {
				this.fio.push(data)
				this.over = false
			}
		},
		handleControlerDrop (data, event) {
			if (Array.isArray(data)) {
				this.fio1.push(...data)
				this.over = false
				this.controler = true
			} else {
				this.fio1.push(data)
				this.over = false
				this.controler = true
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
	#tip {
		position: absolute;
		top: 0;
		left: 0;
		width: 210px;
		background: $secondary;
		height: 30px;
		line-height: 30px;
		font-size: 17px;
		color: #fff;
		padding-left: 1rem;
	}
	.top {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		text-align: right;
		background: $info;
		z-index: 3;
		span {
			font-size: .9rem;
			text-transform: uppercase;
			float: left;
			color: #fff;
			line-height: 30px;
			padding: 0 .5rem;
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
.scroll {
	width: 100%;
	height: 100%;
	padding-bottom: 150px;
	overflow: scroll;
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
.dropFiles {
	z-index: 10;
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
	background: #2C5459ee;
	img { display: none; opacity: .5; }
	h1 {
		display: none;
		opacity: .5;
		text-align: center;
		font-size: 1.4rem;
		font-weight: 400;
		color: #fff;
	}
	&.over {
		width: 100%;
		height: 50%;
		img {
			height: 70px;
			display: block;
		}
		h1 {
			display: block;
		}
	}
}
.dropFiles1 {
	z-index: 10;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 0;
	background: #2C4159ee;
	img { display: none; opacity: .5; }
	h1 {
		display: none;
		opacity: .5;
		text-align: center;
		font-size: 1.4rem;
		font-weight: 400;
		color: #fff;
	}
	&.over {
		width: 100%;
		height: 50%;
		img {
			height: 70px;
			display: block;
		}
		h1 {
			display: block;
		}
	}
}
.dropUser {
	z-index: 10;
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
	background: #4F6850ee;
	img { display: none; opacity: .5; }
	h1 {
		display: none;
		opacity: .5;
		text-align: center;
		font-size: 2rem;
		font-weight: 400;
		color: #fff;
	}
	&.over {
		width: 100%;
		height: 50%;
		img {
			width: 150px;
			display: block;
		}
		h1 {
			display: block;
		}
	}
}
.dropUser1 {
	z-index: 10;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 0;
	background: #592C44ee;
	img { display: none; opacity: .5; }
	h1 {
		display: none;
		opacity: .5;
		text-align: center;
		font-size: 2rem;
		font-weight: 400;
		color: #fff;
	}
	&.over {
		width: 100%;
		height: 50%;
		img {
			height: 90px;
			display: block;
		}
		h1 {
			display: block;
		}
	}
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
	width: 38px;
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
.topform {
	display: flex;
	.v-select {
		/* background: red; */
		width: auto;
	}
	.v-input {
		margin-right: 3rem;
	}
}
.vdr.active:before {
	position: relative;
}

.act {
	background: #fff;
	width: 100%;
	bottom: 0;
}
</style>

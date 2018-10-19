<template lang="pug">
drag-it-dude(v-if="addTask" v-on:dblclick.native="expand" :class="assignClass")
	drop(@drop="handleDrop").drop
		.top
			span создать
			v-icon minimize
			v-icon call_made
			<!-- v&#45;icon call_received -->
			v-icon(@click="closePop").close close
		v-layout(row fill-height justify-start ).add
			div test
			v-flex(xs12)
				v-layout( row wrap )
					v-btn(flat small color="accent" v-for="item in tem").temp
						v-icon star
						span {{ item }}
					v-btn(flat small color="accent").temp
						v-icon star_border
						span 7

				UserSelect(mycolor="white" label="Исполнители" v-on:dblclick.native.stop v-model="selected")
				v-text-field(type='text' class="mx-3" label="Тема" v-model='theme' required )
				v-text-field(type='text' class="mx-3 mt-0" label="Содержание" v-model='description' )
				v-layout( row align-center class="mx-3" )
					v-flex.rel
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
						offset-y full-width )
							v-text-field(slot="activator" v-model="date" label="Дата исполнения" prepend-icon="event" readonly)
							v-date-picker(v-model="date" @input="$refs.menu.save(date)" scrollable locale="ru-ru")
				v-btn(flat) Файлы

	.favusers
		v-layout(row)
			drag(v-for="n in 8" :key="n" class="drag" :transfer-data="{ draggable }" @mousedown.native.stop)
				v-list-tile-avatar
					img(:src="require('@/assets/img/user0.svg')").av
</template>

<script>
import DragItDude from 'vue-drag-it-dude'
import UserSelect from '@/components/UserSelect'

export default {
	data () {
		return {
			expanded: 0,
			selected: null,
			date: '2018-11-12',
			menu: null,
			theme: null,
			days: 3,
			draggable: 'Drag me',
			templ: [ 'Отчеты кв.', 'Новый договор', 'Закупка товаров', 'Цели подчиненных' ],
			tem: [ 1, 2, 3, 4, 5, 6 ]
		}
	},
	computed: {
		srok () {
			let today = new Date().toDateString()
			return today
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
		VueNumericInput
	},
	methods: {
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
			this.$store.commit('closeAddTask')
		},
		handleDrop (data, event) {
			alert(`You dropped with data: ${JSON.stringify(data)}`)
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
		/* background: $info; */
		span {
			font-size: .9rem;
			text-transform: uppercase;
			float: left;
			color: #fff;
			padding: .2rem .5rem;
			background: $info;
		}
		i {
			cursor: pointer;
			padding: .5rem;
			display: inline-block;
			font-size: .97rem;
			&:hover {
				background: #eee;
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
.drop {
	height: 100%;
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
.temp {
	min-width: 0px;
	margin: .5rem .1rem;
}

</style>

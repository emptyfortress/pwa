<template lang="pug">
div.mx-3
	table.users
		thead
			tr
				th.sm
				th.text-xs-left ФИО
				th(v-if="hours").text-xs-center Длит. (час)
				th(v-if="!hours").text-xs-center Длит. (дни)
				th.text-xs-center Срок
				th.text-xs-left Доп. описание
				th.text-xs-center Ответств.
		tbody(id='table')
			tr(v-for="(item, index) in users" :key="index").item
				td.sm
					v-btn(icon @mousedown.native.stop).handle1
						v-icon drag_handle
				td.text-xs-left {{ item.name }}
				td(v-if="hours" width="40%").text-xs-center
					span foo

				td(v-if="!hours").text-xs-center#rel
					.rel(v-if="expanded === 1")
						vue-draggable-resizable( :w="100" :h="26" :x="0" :y="0"
							:minh="26"
							:parent="true"
							@click="test"
							).dragon

				td.text-xs-center.date
					v-menu(ref="menu"
					:close-on-content-click="!hours"
					v-model="item.menu" :nudge-right="30"
					transition="scale-transition"
					offset-y full-width )
						span(slot="activator") {{ datetime }}
						v-layout( row )
							v-date-picker(v-model="date" scrollable locale="ru-Ru" first-day-of-week=1 @input="item.menu=false" )
							v-time-picker(v-model="time" v-if="hours")
						v-layout( row justify-center v-if="hours")
							v-btn(flat color="success" @click="") Отмена
							v-btn(flat color="success" @click="") OK

				td(contenteditable ).text-xs-left Отсутствует
				td.text-xs-center.sm
					input(type="checkbox")
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import VueDraggableResizable from 'vue-draggable-resizable'
import Sortable from 'sortablejs'

export default {
	props: [ 'items', 'hours', 'sequence', 'expanded' ],

	data () {
		return {
			date: '2018-11-16',
			time: '19:00',
			menu: false,
			width: 0,
			height: 0,
			top: 0,
			left: 0
		}
	},
	computed: {
		myW () {
			return 200
		},
		duration () {
			return this.$store.getters.duration
		},
		users () {
			let u = this.items.map(function (item) {
				return {
					name: item,
					date: '2018-11-16',
					time: '19:00',
					duration: 24,
					days: 3,
					menu: false
				}
			})
			return u
		},
		datetime () {
			return this.hours ? this.date + ' --- ' + this.time : this.date
		}
	},
	mounted () {
		let table = document.getElementById('table')
		Sortable.create(table, {
			draggable: '.item',
			handle: '.handle1'
		})
	},
	methods: {
		test () {
			this.left = 100
			console.log(12345)
		},
		resize (newRect) {
			this.width = newRect.width
			this.height = newRect.height
			this.top = newRect.top
			this.left = newRect.left
		},
		activateEv () {
			this.rectActive = true
		},
		deactivateEv () {
			console.log(12345)
			this.rectActive = false
		}
	},
	components: {
		VueDraggableResizable,
		VueDragResize
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.users {
	width: 100%;
	th { color: #bbb; font-size: .85rem; border-bottom: 1px solid #eee; font-weight: 500; }
	tr:hover {
		background: #eee;
	}
	td {
		padding: 0 .5rem;
	}
	.sm { width: 30px; padding: 0;}
	.md { width: 80px; }
	.date { width: 150px; }
}

.handle1 {
	margin: 0;
}

.v-menu__content {
	background: #fff;
}

/deep/ .v-time-picker-title__time .v-picker__title__btn, /deep/ .v-time-picker-title__time  span {
	font-size: 56px;
	height: 56px;
}

#rel {
	background: #eee;
	width: 40%;
	/* display: block; */
}
.rel {
	position: relative;
	background: #eee;
	height: 26px;
	width: 100%;
}

.dragon {
	background: $info;
	color: #fff;
	line-height: 26px;
}

/* hide drag handle  */
/* /deep/ .handle { */
/*   background-color: transparent !important; */
/*   border-width: 0px !important; */
/* 	&.handle-tm { */
/* 		width: 100% !important; */
/* 		left: 5px !important; */
/* 	} */
/* 	&.handle-bm { */
/* 		width: 100% !important; */
/* 		left: 5px !important; */
/* 	} */
/* 	&.handle-mr { */
/* 		height: 100% !important; */
/* 		top: 5px !important; */
/* 	} */
/* 	&.handle-ml { */
/* 		height: 100% !important; */
/* 		top: 5px !important; */
/* 	} */
/* } */
</style>

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

				td(v-if="expanded === 0").text-xs-center
					span {{ days }}

				td(ref="parent" v-if="expanded === 1" width="40%").text-xs-center.gant
					.rel
						vue-drag-resize( :w="width[index]" :h="36" :x="left[index]" :y="0"
							:minh="36" :minw="100"
							:sticks="[ 'ml', 'mr' ]" axis="x"
							:parentLimitation="true"
							@dragging="onDrag(index)"
							@resizing="onResize(index)"
							).dragon
							span {{ days / users.length }}

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
import Sortable from 'sortablejs'

export default {
	props: [ 'items', 'hours', 'sequence', 'expanded' ],

	data () {
		return {
			date: '2018-11-16',
			time: '19:00',
			menu: false,
			// left: [0],
			width: [100]
		}
	},
	computed: {
		days () {
			return this.$store.getters.duration
		},
		duration () {
			return this.$store.getters.duration
		},
		users () {
			let u = this.items.map(function (item, index) {
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
		left () {
			return this.items.map(function (item, index) {
				return 100 * index
			})
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
	updated () {
	},
	methods: {
		setPos () {
			console.log(this.items)
			// let tmp = this.users.length - 1

		},
		setPar () {
			console.log(this.$refs.parent.length)
		},
		onResize (index) {
			// this.users
		},
		onDrag (index) {
			console.log('drag ' + index)
			// console.log('drag')
			// this.x = x
			// this.y = y
		}
	},
	components: {
		VueDragResize
	},
	watch: {
		sequence (value) {
			if (value === '1') {
				this.setPar()
			} else if (value === '2') {
				this.setPos()
			}
		}
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
	.gant {
		padding: 0;
		background: red;
	}
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

.rel {
	position: relative;
	background: #eee;
	height: 36px;
	width: 100%;
}

.dragon {
	background: $info;
	color: #fff;
	line-height: 36px;
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

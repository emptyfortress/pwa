<template lang="pug">
div.mx-3
	table(ref="tab").users
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

				td(ref="parent" v-if="expanded === 1" width="500").text-xs-center.gant
					.rel
						vue-drag-resize( :w="item.width" :h="36" :x="item.left" :y="0"
							:minh="36" :minw="100"
							:sticks="[ 'ml', 'mr' ]" axis="x"
							:parentLimitation="true"
							:isActive="true"
							v-show="sequence === 'par'"
							).dragon
							span(v-if="!hours") {{ days }}
							spa(v-if="hours") {{ days * 8 }}

						vue-drag-resize( :w="item.width1" :h="36" :x="item.left1" :y="0"
							:minh="36" :minw="100"
							:sticks="[ 'ml', 'mr' ]" axis="x"
							:parentLimitation="true"
							:isActive="true"
							v-show="sequence === 'pos'"
							).dragon
							span(v-if="!hours") {{ days / users.length }}
							span(v-if="hours") {{ days * 8 / users.length }}

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
			limit: true
		}
	},
	computed: {
		width () {
			return 500 / this.items.length
		},
		days () {
			return this.$store.getters.duration
		},
		duration () {
			return this.$store.getters.duration
		},
		users () {
			let a = this.items.length
			let u = this.items.map(function (item, index) {
				return {
					name: item,
					date: '2018-11-16',
					time: '19:00',
					duration: 24,
					days: 3,
					menu: false,
					width: 500,
					width1: 500 / a,
					left: 0,
					left1: 500 / a * index
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
	updated () {
	},
	methods: {
		setPos () {
			this.users = []
		},
		setPar () {
		},
		setTrue () {
			this.limit = true
		},
		setFalse () {
			this.limit = false
		}
	},
	components: {
		VueDragResize
	},
	watch: {
		sequence (value) {
			if (value === 'par') {
				this.setPar()
			} else if (value === 'pos') {
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

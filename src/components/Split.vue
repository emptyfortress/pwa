<template lang="pug">
div
	.panel
		v-slide-x-transition(mode="out-in")
			.selectionPanel(v-if="selectMode" key="one")
				div
					v-checkbox(v-model="selectAll" primary hide-details @click.native="toggleAll" :indeterminate="check").mt0.left
				.divide
				.quantity
					v-btn(flat @click="closeSelection").mx-0.mt-0.close
						i.icon-close
							span {{selectedItems.length}}
				.actionBt(v-if="selectedItems.length" key="two")
					span &rArr;
					v-btn(flat text color="primary") В работу
					v-btn(flat text color="primary") Делегировать

			div(v-if="!selectMode" key="three")
				v-btn(icon v-if="!selectMode" key="two" @click="selectMode = true").grouppen
					i.icon-packet
		.actionBt(v-if="allRead" key="three")
			v-btn(flat color="primary" @click="clearUnread" ) Сбросить новые

		.divide.ml-2.mr-4
		v-menu(transition="slide-y-transition")
			.filter( slot="activator" )
				span.hd {{ filter }}
				v-icon arrow_drop_down
			v-list
				v-list-tile(v-model="currentFilter" v-for="(item, index) in ffilters" :key="index" @click="setFilter(item)")
					v-list-tile-title {{ item }}
	div.all
		drag-zone.zone
			drag-content.content
				SlickList(lockAxis="y" :value="items" helperClass="moving" :distance=2 @input="newArr")
					transition-group(name="sort" )
						SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item" )
							v-card(flat v-responsive="cardResponse" :class="myclass(item)" @click.native="selectCard(item, $event)").desktope
								.wrap
									.drag(@click.prevent="item.unread = !item.unread" @click="doNothing")
									.check(v-if="selectMode")
										v-checkbox(v-model="item.selected" :value="item.selected" :id="item.id.toString()" @click.prevent="item.selected = !item.selected" @click="doNothing")
									v-list-tile-avatar
										img(:src="require('@/assets/img/user0.svg')").av
									.card-content
										.head {{item.title}}
										.some some staff goes here
										.fio {{ item.executor }}
										.date {{item.created}}
										.state {{ item.status }}
				.empty(v-if="items.length === 0")
					img(:src="require('@/assets/img/man.svg')")
					div {{list}}
			drag-handle.handle
				div
			drag-content.content
				v-slide-x-transition(mode="out-in")
					Detail(:id="currId")
					<!-- router&#45;view(v&#45;bind:key="currId" :detail="detail" ) -->
				<!-- v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="!detail") -->
				<!-- 	DummyFolder(:folder="currentFolder") -->
				<!-- v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="!detail &#38;&#38; !selectMode") -->
					<!-- DummyFolder(:folder="currentFolder") -->
				<!-- v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="!detail &#38;&#38; selectMode") -->
				<!-- 	Detail(:id="currId") -->
					<!-- MultiSelect -->

</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import { ResponsiveDirective } from 'vue-responsive-components'
// import MultiSelect from '@/components/MultiSelect'
import Detail from '@/components/Detail'

export default {
	data () {
		return {
			ffilters: [ 'Все', 'Новые', 'Просроченные', 'Важные', 'На контроле', 'Завершенные' ],
			cardResponse: {
				tiny: el => el.width < 400,
				small: el => el.width < 800,
				big: el => el.width > 1000
			},
			selectMode: false,
			selectAll: false,
			selectNew: false,
		}
	},
	computed: {
		detail () { return this.$store.getters.detail },
		currId () { return this.$route.params.id },
		currentPath () { return this.currentFolder.path },
		currentFolder () { return this.$store.getters.currentFolder },
		loading () { return this.$store.getters.loading },
		filter () { return this.currentFolder.filter },
		check () {
			if (this.selectedItems.length === 0 || this.selectedItems.length === this.items.length) {
				return false
			} else return true
		},
		// selected () { return this.$store.getters.selected },
		items () {
			let all = this.$store.getters.items
			if (this.filter === 'Новые') {
				return all.filter(item => item.unread)
			} else if (this.filter === 'Просроченные') {
				return all.filter(item => item.overdue)
			} else if (this.filter === 'На контроле') {
				return all.filter(item => item.controler)
			} else if (this.selectNew === true) {
				let unread = all.filter(item => item.unread)
				unread.map(item => { item.selected = true })
				return unread
			} else if (this.selectNew === false) {
				all.map(item => { item.selected = false })
				return all
			} else return all
		},
		allRead () {
			let unreadItems = this.items.filter(item => item.unread)
			if (unreadItems.length === 0) {
				return false
			} else return true
		},
		selectedItems () {
			return this.items.filter(item => item.selected)
		},
		quantity () {
			return this.selectedItems.length
		},
		list () {
			if (this.items.length === 0 && this.filter === 'unread') {
				return 'Новых нет'
			} else if (this.items.length === 0 && this.filter === 'overdue') {
				return 'Просроченных нет'
			} else if (this.items.length === 0 && this.filter === 'important') {
				return 'Важных нет'
			}
		}
	},
	methods: {
		setFilter (e) {
			let dummy = {}
			dummy.id = this.$store.getters.currentFolder.id
			dummy.filter = e
			this.$store.dispatch('updateFolderFilter', dummy)
		},
		toggleAll () {
			if (this.selectAll) {
				return this.items.map(item => { item.selected = true })
			} else {
				return this.items.map(item => { item.selected = false })
			}
		},
		doNothing (evt) {
			evt.stopPropagation()
		},
		showAll () {
			let dummy = {}
			dummy.id = this.currentFolder.id
			dummy.filter = ''
			this.$store.dispatch('updateFolderFilter', dummy)
		},
		closeSelection () {
			this.selectMode = false
		},
		clearUnread () {
			let items = this.$store.getters.items
			items.map(function (item) {
				item.unread = 0
			})
		},
		selectCard (e, i) {
			let destination = this.currentPath + '/' + e.id
			let full = this.$route.path
			if (this.selectMode && full !== destination) {
				this.$router.push(destination)
			}
			if (i.shiftKey) {
				this.selectMode = true
				this.$store.commit('toggleDetail', true)
				e.selected = true
			} else {
				this.$router.push(destination)
				this.$store.commit('toggleDetail', true)
			}
		},
		newArr (e) {
			this.$store.commit('setItems', e)
		},
		myclass (e) {
			let url = this.$route.params.id
			url = parseInt(url, 10)
			if (e.unread && e.id === url && !this.selectMode) return 'unread selected'

			else if (e.unread) return 'unread'
			else if (e.id === url) return 'selected'
		}
	},
	components: {
		SlickItem,
		SlickList,
		// DummyFolder,
		// MultiSelect,
		Detail
	},
	directives: {
		responsive: ResponsiveDirective
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.mt0 {
	margin: 0;
	margin-left: 2rem;
}

.all {
	height: calc(100vh - 72px);
	width: 100%;
	position: relative;
	/* margin-top: 3rem; */
}

.zone {
	width: 100%;
	height: 100%;
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
	}
}

.v-avatar {
	align-self: center;
	margin: 0 .7rem;
	.av {
		background: $grey;
	}
}

.wrap {
	display: flex;
	height: 100%;
	.drag {
		width: 8px;
		background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIUlEQVQYV2Ns2vj/f50/IyMDAwMDmPj///9/RhAAcWAAAN0pCAS0Z2yqAAAAAElFTkSuQmCC) repeat;
	}
}
.divide {
	width: 1px;
	margin-bottom: 5px;
	background: #ccc;
	box-shadow: 1px 0 0 #fff;
}

.v-card.unread, .v-card.selected.unread {
	.drag {
		background-color: darken($accent, 30%);
	}
	.head {
		font-weight: bold;
		color: darken($accent, 30%);
	}
}

.desktope.v-card {
	margin-bottom: 1px;
	user-select: none;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.moving {
	background: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
	font-family: Roboto;
	color: #000;
	line-height: 170%;
}
.big.desktope {
	.card-content .some {
		display: block;
		margin-right: 2rem;
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
		width: 100px;
		text-align: right;
	}
	.some { display: none; }
}

.small.tiny.desktope {
	.fio, .date, .state, .v-list__tile__avatar { display: none; }
}
.desktope {
	.v-list__tile__avatar { display: none; }
}
.small.desktope {
	overflow: hidden;
	.card-content {
		display: block;
		.head {
			font-size: 1.27rem;
		}
		.fio, .date, {
			font-size: .95rem;
			float: left;
			opacity: .5;
		}
		.state {margin-top: 2px; float: right;}
	}
	.v-list__tile__avatar {
		align-self: center;
		margin: 0 .7rem;
		.av {
			background: $grey;
		}
		display: block;
	}
}
.desktope.selected {
	background: $secondary;
	color: #fff;
	.head { color: #fff; }
	.fio {
		font-weight: normal;
	}
}

.empty {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	color: rgba(0, 0, 0, .4);
	img {
		width: 30%;
	}
}

.check {
	margin-left: 1rem;
	align-self: center;
	input, .v-input.v-input--selection-controls.v-input--checkbox {
		margin: 0;
		padding: 0;
		padding-top: .5rem;
		margin-bottom: -1rem;
	}
}

.panel {
	padding: .5rem 1rem 0 0;
	display: flex;
	border-bottom: 1px solid #ccc;
	box-shadow: 0 1px 3px #ccc;
	z-index: 10;
}

.selectionPanel {
	display: flex;
	div {
		.left { margin-left: 1.5rem; margin-right: 1rem; }
	}
}

.quantity {
	font-size: 1.1rem;
	font-weight: 300;
	span {
		margin-left: 1rem;
		font-size: 1.5rem;
		font-weight: 600;
	}
}
.icon-prev { font-style: normal; }

.close { min-width: 10px; }

.icon-close {
	font-size: 1.3rem;
	font-style: normal;
	span {
		margin-left: .5rem;
		font-size: 1.6rem;
	}
}
.actionBt {
	margin-top: 0;
	.v-btn { margin: 0;  }
	span {
		font-size: 1.5rem;
		display: inline-block;
	}

}
.grouppen {
	margin-top: 0;
	margin-left: 1rem;
	i {
		font-size: 1.5rem;
	}
}
.filter {
	line-height: 37px;
	.hd { font-size: 1.2rem; }
	i { vertical-align: middle; }
}

</style>

<template lang="pug">
div
	.panel
		v-slide-x-transition(mode="out-in")
			.selectionPanel(v-if="selectMode" key="one")
				div
					v-checkbox(v-model="selectAll" primary hide-details @click.native="toggleAll").mt0.left
				.quantity
					v-btn(flat @click="closeSelection").mx-0.mt-0.close
						i.icon-close
							span {{selectedItems.length}}
				.actionBt
					v-btn(flat text color="info") В работу
					v-btn(flat text color="info") Делегировать
					v-btn(flat text color="info") Завершить
			v-btn(flat small color="info" @click="clearUnread" v-if="allRead && !selectMode" key="two") Сбросить новые
		v-slide-x-transition(mode="out-in")
			v-btn(flat small color="info" @click="showAll" v-if="filter !== '' && !selectMode" ) Показать все
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
										v-checkbox(v-model="item.selected" :value="item.selected" :id="item.id.toString()" )
									v-list-tile-avatar
										img(:src="require('@/assets/img/user0.svg')").av
									.card-content
										.head {{item.title}}
										.some some staff goes here
										.fio {{ item.author }}
										.date {{item.created}}
										.state(@click="test") В работе
				.empty(v-if="items.length === 0")
					img(:src="require('@/assets/img/man.svg')")
					div {{list}}
			drag-handle.handle
				div
			drag-content.content
				v-slide-x-transition(mode="out-in" v-if="detail")
					router-view
				v-slide-x-transition(mode="out-in" v-if="!detail && !selectMode")
					DummyFolder(:folder="currentFolder")
				v-slide-x-transition(mode="out-in" v-if="!detail && selectMode")
					MultiSelect(:selItems="selectedItems")

	v-snackbar(v-model="snackbar" :timeout=0 multi-line ).snackbar
		v-btn(flat  @click="snackbar = false") Подписать
		v-btn(flat  @click="snackbar = false") Делегировать
		v-btn(flat icon  @click="snackbar = false")
			i.icon-close
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import { ResponsiveDirective } from 'vue-responsive-components'
import DummyFolder from '@/components/DummyFolder'
import MultiSelect from '@/components/MultiSelect'

export default {
	data () {
		return {
			cardResponse: {
				tiny: el => el.width < 400,
				small: el => el.width < 800,
				big: el => el.width > 1000
			},
			selectMode: false,
			snackbar: false,
			detail: false,
			selectAll: false,
			selectNew: false
		}
	},
	computed: {
		currentPath () { return this.currentFolder.path },
		currentFolder () { return this.$store.getters.currentFolder },
		loading () { return this.$store.getters.loading },
		filter () { return this.currentFolder.filter },
		// selected () { return this.$store.getters.selected },
		items () {
			let all = this.$store.getters.items
			if (this.filter === 'unread') {
				return all.filter(item => item.unread)
			} else if (this.filter === 'overdue') {
				return all.filter(item => item.overdue)
			} else if (this.filter === 'important') {
				return all.filter(item => item.important)
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
			let items = this.$store.getters.items
			let unreadItems = items.filter(item => item.unread)
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
	watch: {
		selectedItems (val) {
			if (val.length > 1) {
				this.snackbar = true
			} else this.snackbar = false
		}
	},
	methods: {
		test () {
			console.log(this.selectedItems)
			console.log(this.selected)
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
			if (this.selectMode) {
				return
			}
			if (i.shiftKey) {
				this.selectMode = true
				this.detail = false
				e.selected = true
			} else {
				this.$router.push(destination)
				this.detail = true
				this.selectMode = false
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
			else if (e.id === url && !this.selectMode) return 'selected'
		}
	},
	components: {
		SlickItem,
		SlickList,
		DummyFolder,
		MultiSelect
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
	height: calc(100vh - 108px);
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
}

.selectionPanel {
	display: flex;
	div {
		.left { margin-left: 1.5rem; margin-right: 2rem; }
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
	margin-left: 5rem;
	margin-top: 0;
	.v-btn { margin-top: 0; }
}

</style>

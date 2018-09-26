<template lang="pug" >
v-slide-x-transition(mode="out-in")
	div
		.panel
			v-slide-y-transition
				.selectionPanel(v-if="selectMode" key="one")
					div
						v-checkbox(id="all" v-model="selectAll" value="select" label="Все" color="success").mt0.left
						v-checkbox(id="new" v-model="selectNew" label="Новые" color="success").mt0.left
					.quantity Выбрано
						span {{quantity}}
					v-btn(flat @click="closeSelection").mt0
						i.icon-prev Назад
				v-btn(flat small color="info" @click="clearUnread" v-if="allRead && !selectMode" key="two") Сбросить новые
			v-slide-y-transition
				v-btn(flat small color="info" @click="showAll" v-if="filter !== '' && !selectMode" ) Показать все
		<!-- div.all(v&#45;if="$vuetify.breakpoint.lgAndUp &#38;&#38; view === 'split'" ) -->
		<!-- 	drag&#45;zone.zone -->
		<!-- 		drag&#45;content.content -->
		<!-- 			SlickList(lockAxis="y" :value="items" helperClass="moving" :distance=2 @input="newArr") -->
		<!-- 				transition&#45;group(name="sort" ) -->
		<!-- 					SlickItem(v&#45;for="(item, index) in items" :index="index" :key="index" :item="item" ) -->
		<!-- 						v&#45;card(flat v&#45;responsive="cardResponse" :class="myclass(item)" @click.native="selectCard(item, $event)").desktope -->
		<!-- 							.wrap -->
		<!-- 								.drag(@click.prevent="item.unread = !item.unread" @click="doNothing") -->
		<!-- 								v&#45;list&#45;tile&#45;avatar(v&#45;if="!selectMode") -->
		<!-- 									img(:src="require('@/assets/img/user0.svg')" v&#45;if="!selectMode").av -->
		<!-- 								.check(v&#45;if="selectMode") -->
		<!-- 									v&#45;checkbox(v&#45;model="item.selected" :value="item.selected" :id="item.id.toString()" color="success") -->
		<!-- 								.card&#45;content -->
		<!-- 									.head {{item.title}} -->
		<!-- 									.some some staff goes here -->
		<!-- 									.fio {{ item.author }} -->
		<!-- 									.date {{item.created}} -->
		<!-- 									.state В работе -->
		<!-- 			.empty(v&#45;if="items.length === 0") -->
		<!-- 				img(:src="require('@/assets/img/man.svg')") -->
		<!-- 				div {{list}} -->
		<!-- 		drag&#45;handle.handle -->
		<!-- 			div -->
		<!-- 		drag&#45;content.content -->
		<!-- 			v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="detail") -->
		<!-- 				router&#45;view -->
		<!-- 			v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="!detail &#38;&#38; !selectMode") -->
		<!-- 				DummyFolder(:folder="currentFolder") -->
		<!-- 			v&#45;slide&#45;x&#45;transition(mode="out&#45;in" v&#45;if="!detail &#38;&#38; selectMode") -->
		<!-- 				MultiSelect(:quantity="quantity") -->
		Tiles(v-if="$vuetify.breakpoint.lgAndUp && view === 'tile'" :items="items")
		Split(v-if="$vuetify.breakpoint.lgAndUp && view === 'split'" :items="items")
		DataTable(v-if="$vuetify.breakpoint.lgAndUp && view === 'table'" :items="items")

		v-layout( column v-if="$vuetify.breakpoint.mdAndDown")
			SlickList(lockAxis="y" :value="items" helperClass="moving" :pressDelay=300 @input="newArr")
				SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
					v-card(flat :to="'/m/' + item.id" :class="item.unread ? 'unread' : ''" ).mobile
						.wrap
							.drag(@click.prevent="item.unread = !item.unread" )
							.card-content
								.head {{item.title}}

</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import { ResponsiveDirective } from 'vue-responsive-components'
import Tiles from '@/components/Tiles'
import Split from '@/components/Split'
import DataTable from '@/components/DataTable'
// import DummyFolder from '@/components/DummyFolder'
// import MultiSelect from '@/components/MultiSelect'

export default {
	data () {
		return {
			cardResponse: {
				tiny: el => el.width < 400,
				small: el => el.width < 800,
				big: el => el.width > 1000
			},
			selectMode: false,
			detail: false,
			selectAll: 'none',
			selectNew: false
		}
	},
	computed: {
		view () { return this.$store.getters.view },
		currentPath () { return this.currentFolder.path },
		currentFolder () { return this.$store.getters.currentFolder },
		loading () { return this.$store.getters.loading },
		filter () { return this.currentFolder.filter },
		selected () { return this.$store.getters.selected },
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
		selectedItems () {
			if (this.selectAll === 'select') {
				this.$store.commit('setSelected', true)
				return this.items.map(item => { item.selected = true })
			} else if (this.selectAll === 'none') {
				let temp = this.items.filter(item => item.selected)
				if (temp.length > 0) {
					this.$store.commit('setSelected', true)
				} else if (temp.length === 0) {
					this.$store.commit('setSelected', false)
				}
				return temp
			} else {
				this.$store.commit('setSelected', false)
				return this.items.map(item => { item.selected = false })
			}
		},
		quantity () {
			return this.selectedItems.length
		},
		allRead () {
			let items = this.$store.getters.items
			let unreadItems = items.filter(item => item.unread)
			if (unreadItems.length === 0) {
				return false
			} else return true
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
		doNothing (evt) {
			evt.stopPropagation()
		},
		closeSelection () {
			this.selectMode = false
		},
		selectCard (e, i) {
			let destination = this.currentPath + '/' + e.id
			if (this.selectMode) {
				return
			}
			if (i.shiftKey) {
				this.selectMode = true
				this.detail = false
			} else {
				this.$router.push(destination)
				this.detail = true
				this.selectMode = false
			}
		},
		clearUnread () {
			let items = this.$store.getters.items
			items.map(function (item) {
				item.unread = 0
			})
		},
		showAll () {
			let dummy = {}
			dummy.id = this.currentFolder.id
			dummy.filter = ''
			this.$store.dispatch('updateFolderFilter', dummy)
		},
		featuredType (e) {
			return this.featured.filter(x => x.type === e)
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
		},
		toggleUnread (e) {
			e.unread = !e.unread
			this.$store.dispatch('updateItemReadStatus', e)
		}
	},
	components: {
		SlickItem,
		SlickList,
		Tiles,
		Split,
		DataTable
		// DummyFolder,
		// MultiSelect
	},
	directives: {
		handle: HandleDirective,
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
			div {
				border-left: 3px dotted #333;
			}
		}
	}
	.item {
		/* width: 100%; */
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
		background-color: $accent;
	}
	.head {
		font-weight: bold;
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
	/* display: table-row; */
}

.mobile.v-card {
	.card-content {
		margin: 1rem;
		width: 100%;
		.head {
			font-size: 1.27rem;
		}
	}
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
		color: $secondary;
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
.panel {
	padding: .5rem 0;
	height: 3.5rem;
	/* font-size: 1.2rem; */
	/* background: red; */
}

.application .theme--light.v-card, .theme--light .v-card {
	&:hover {
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

.selectionPanel {
	display: flex;
	div {
		.left { margin-left: 1.5rem; margin-right: 2rem; }
	}
}
.quantity {
	font-size: 1.1rem;
	margin-left: 2rem;
	font-weight: 300;
	span {
		margin-left: 1rem;
		font-size: 1.5rem;
		font-weight: 600;
	}
}
.icon-prev { font-style: normal; }

</style>

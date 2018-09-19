<template lang="pug" >
v-slide-x-transition(mode="out-in")
	div
		.panel
			v-slide-y-transition
				v-btn(flat small color="info" @click="clearUnread" v-if="allRead") Сбросить новые
			v-slide-y-transition
				v-btn(flat small color="info" @click="showAll" v-if="filter !== ''") Показать все
		div.all(v-if="$vuetify.breakpoint.lgAndUp && !tile" )
			drag-zone.zone
				drag-content.content
					SlickList(lockAxis="y" :value="items" helperClass="moving" :distance=2 @input="newArr")
						transition-group(name="sort" )
							SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item" )
								<!-- v&#45;card(flat :to="currentPath + '/' + item.id" v&#45;responsive="cardResponse" :class="myclass(item)" @click.native="test").desktope -->
								v-card(flat v-responsive="cardResponse" :class="myclass(item)" @click.native="").desktope
									.wrap
										.drag(@click.prevent="toggleUnread(item)" )
										v-list-tile-avatar
											img(src="@/assets/img/user0.svg" ).av
										.card-content
											.head {{item.title}}
											.some some staff goes here
											.fio {{ item.author }}
											.date {{item.created}}
											.state В работе
					.empty(v-if="items.length === 0")
						img(src="@/assets/img/man.svg")
						div {{list}}
				drag-handle.handle
					div
				drag-content.content
					v-slide-x-transition(mode="out-in" v-if="detail")
						router-view
					v-slide-x-transition(mode="out-in" v-else)
						DummyFolder(:folder="currentFolder" :items="items")
		Tiles(v-if="$vuetify.breakpoint.lgAndUp && tile" :items="items")

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
import DummyFolder from '@/components/DummyFolder'

export default {
	data () {
		return {
			cardResponse: {
				tiny: el => el.width < 400,
				small: el => el.width < 800,
				big: el => el.width > 1000
			}
		}
	},
	computed: {
		detail () {
			if (this.$route.params.id === undefined) {
				return false
			} else return true
		},
		tile () { return this.$store.getters.tile },
		currentPath () { return this.currentFolder.path },
		currentFolder () { return this.$store.getters.currentFolder },
		loading () { return this.$store.getters.loading },
		filter () { return this.currentFolder.filter },
		items () {
			let all = this.$store.getters.items
			if (this.filter === 'unread') {
				return all.filter(item => item.unread)
			} else if (this.filter === 'overdue') {
				return all.filter(item => item.overdue)
			} else if (this.filter === 'important') {
				return all.filter(item => item.important)
			} else return all
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
		test () {
			this.$router.push('/')
			console.log('test')
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
			if (e.unread && e.id === url) return 'unread selected'
			else if (e.unread) return 'unread'
			else if (e.id === url) return 'selected'
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
		DummyFolder
	},
	directives: {
		handle: HandleDirective,
		responsive: ResponsiveDirective
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

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
	min-height: 3.5rem;
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
</style>

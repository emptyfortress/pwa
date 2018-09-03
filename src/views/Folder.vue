<template lang="pug" >
v-slide-x-transition(mode="out-in")
	div.all(v-if="$vuetify.breakpoint.lgAndUp && !tile" )
		h1 {{currentFolder.text}}
		drag-zone.zone
			drag-content.content
				SlickList(lockAxis="y" :value="items" helperClass="moving" :distance=2 @input="newArr")
					SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
						v-card(flat :to="currentPath + '/' + item.id" v-responsive="cardResponse" :class="item.unread ? 'unread' : ''" ).desktope
							.wrap
								.drag(@click.prevent="item.unread = !item.unread" )
								v-list-tile-avatar
									img(src="@/assets/img/user0.svg").av
								.card-content
									.head {{item.title}}
									.some some staff goes here
									.fio Johtn Smith
									.date 21 авг 18 г.
									.state В работе
			drag-handle.handle
				div
			drag-content.content
				v-slide-x-transition(mode="out-in")
					router-view
	Tiles(v-if="$vuetify.breakpoint.lgAndUp && tile" :items="items")

	v-layout( column v-if="$vuetify.breakpoint.mdAndDown")
		SlickList(lockAxis="y" :value="items" helperClass="moving" useDragHandle @input="newArr")
			SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
				v-card(flat :to="'/m/' + item.id").mobile
					.wrap
						.drag(v-handle)
						.card-content
							.head {{item.title}}

</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import { ResponsiveDirective } from 'vue-responsive-components'
import Tiles from '@/components/Tiles'

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
		cardWidth () {
			if (this < 800) {
				return 'small'
			} else if (this < 400) {
				return 'tiny'
			}
			return null
		},
		tile () {
			return this.$store.getters.tile
		},
		currentPath () {
			return this.currentFolder.data.path
		},
		currentFolder () {
			return this.$store.getters.currentFolder
		},
		loading () {
			return this.$store.getters.loading
		},
		items () {
			return this.$store.getters.items
			// return this.$store.getters.items.filter(e => e.folder === this.currentFolder.id)
		}
	},
	methods: {
		newArr (e) {
			this.$store.commit('setItems', e)
		}
	},
	components: {
		SlickItem,
		SlickList,
		Tiles
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
}

.zone {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	position: relative;
	clear: both;
	display: flex;
	.handle {
		width: 20px;
		div {
			width:8px;
			height: 100%;
			transform: translateX(10px);
		}
		&:hover {
			div {
				border-left: 3px dotted #333;
			}
		}
	}
	.item {
		width: 100%;
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
		background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGElEQVQYV2NctmzZ/8jISAZGEGBAAigcAI4pBAQE47ttAAAAAElFTkSuQmCC) repeat;
	}
}

.v-card.unread {
	.drag {
		background-color: $accent;
	}
	.head {
		font-weight: bold;
	}
}

.desktope.v-card {
	margin-bottom: 1px;
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
	.head {
		font-size: 1rem;
		flex-grow: 1;
		color: $secondary;
	}
	.fio {
		overflow: hidden;
	}
	.date {
		margin: 0 2rem;
		overflow: hidden;
	}
	.state {
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
		.fio, .date, .state {
			font-weight: 300;
			font-size: .95rem;
			float: left;
		}
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

</style>

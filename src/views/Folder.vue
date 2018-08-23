<template lang="pug" >
v-slide-x-transition(mode="out-in")
	div.all(v-if="$vuetify.breakpoint.lgAndUp && !tile" )
		h1 {{currentFolder.text}}
		drag-zone.zone
			drag-content.content
				SlickList(lockAxis="y" :value="items" useDragHandle helperClass="moving" @input="newArr")
					SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
						v-card(flat :to="currentPath + '/' + item.id" v-responsive="cardResponse").desktope
							.wrap
								div(v-handle).drag
								div.card-content
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
						div(v-handle).drag
						div.card-content
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
		},
		tee () {

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

.wrap {
	display: flex;
	.drag {
		width: 15px;
		background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2PcvHHzf19/X0YGBgYGMAEDKBwAjs0EBCLstwQAAAAASUVORK5CYII=) repeat;
		/* background-color: blue; */
	}
}

.desktope.v-card {
	margin-bottom: 1px;
}

.mobile.v-card {
	/* margin-bottom: 1rem; */
	.card-content {
		margin: 1rem;
		width: 100%;
		.head {
			/* font-weight: 300; */
			font-family: Roboto;
			font-size: 1.27rem;
		}
	}
}

.moving {
	background: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
	font-family: Roboto;
	color: #000;
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
		/* width: 60%; */
		/* width: 60%; */
		font-size: 1rem;
		flex-grow: 1;
	}
	.fio {
		/* width: 20%; */
		overflow: hidden;
	}
	.date {
		margin: 0 2rem;
		/* width: 10%; */
		overflow: hidden;
	}
	.state {
		/* width: 10%; */
		/* width: 100px; */
		overflow: hidden;
	}
	.some { display: none; }
}
.small.tiny.desktope {
	.fio, .date, .state { display: none; }
}
.small.desktope {
	/* white-space: nowrap; */
	overflow: hidden;
	.card-content {
		display: block;
		.head {
			font-weight: 400;
			font-size: 1.27rem;
		}
		.fio, .date, .state {
			font-weight: 300;
			font-size: .95rem;
			/* color: #666; */
			float: left;
		}
	}
}

</style>

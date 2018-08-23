<template lang="pug" >
div
	div.all(v-if="$vuetify.breakpoint.lgAndUp" )
		h1 {{currentFolder.text}}
		drag-zone.zone
			drag-content.content
				SlickList(lockAxis="y" :value="items" useDragHandle helperClass="moving" @input="newArr")
					SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
						v-card(flat :to="currentPath + '/' + item.id" v-responsive="{ tiny: el => el.width < 400, small: el => el.width < 800 }").desktope.responsive-component
							.wrap
								div(v-handle).drag
								div.card-content
									h2 {{item.title}}
			drag-handle.handle
				div
			drag-content.content
				v-slide-y-transition(mode="out-in")
					router-view

	v-layout( column v-if="$vuetify.breakpoint.mdAndDown")
		SlickList(lockAxis="y" :value="items" helperClass="moving" useDragHandle @input="newArr")
			SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
				v-card(flat :to="'/m/' + item.id").mobile
					.wrap
						div(v-handle).drag
						div.card-content
							h2 {{item.title}}

</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import { ResponsiveDirective } from 'vue-responsive-components'

export default {
	data () {
		return {
		}
	},
	computed: {
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
		SlickList
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

.drag {
	width: 15px;
	background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQYV2PcvHHzf19/X0YGBgYGMAEDKBwAjs0EBCLstwQAAAAASUVORK5CYII=) repeat;
	/* background-color: blue; */
}
.wrap {
	display: flex;
}

.desktope.v-card {
	margin-bottom: 1px;
}

.mobile.v-card {
	/* margin-bottom: 1rem; */
	.card-content {
		margin: 1rem;
		width: 100%;
		h2 {
			font-weight: 400;
			font-size: 1.27rem;
		}
	}
}

.desktope .card-content {
	margin: 1rem;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	h2 {
		font-weight: 400;
		font-size: 1.27rem;
	}
}
.moving {
	background: #fff;
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
	h2 {
		font-family: Roboto;
		color: #000;
	}
}
.small.tiny.responsive-component {
		background: green;
}
.small.responsive-component {
		background: red;
}

</style>

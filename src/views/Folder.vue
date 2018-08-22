<template lang="pug" >
div
	div.all(v-if="$vuetify.breakpoint.lgAndUp")
		h1 {{currentFolder.text}}
		drag-zone.zone
			drag-content.content
				SlickList(lockAxis="y" :value="items" useDragHandle @input="newArr")
					SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
						v-card(:to="currentPath + '/' + item.id").rel
							h2 Item {{item.id}}
							div(v-handle).drag
			drag-handle.handle
				div
			drag-content.content
				v-slide-y-transition(mode="out-in")
					router-view

	v-layout( column v-if="$vuetify.breakpoint.mdAndDown")
		SlickList(lockAxis="y" :value="items" useDragHandle @input="newArr")
			SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
				v-card(:to="'/m/' + item.id")
					h2 Item {{item.id}}
					div(v-handle).drag

</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'

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
		}
	},
	components: {
		SlickItem,
		SlickList
	},
	directives: {
		handle: HandleDirective
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

.m .v-card.v-card--flat {
	background: #fff;
	/* margin-bottom: 1rem; */
}
.v-card {
	background: #fff;
	margin-bottom: 1px;
	padding: 1rem;
	padding-left: 3rem;
	h2 {
		font-weight: 400;
	}
}
.drag {
	position: absolute;
	top: 50%;
	left: 5px;
	width: 11px;
	height: 30px;
	transform: translateY(-15px);
	background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAF0lEQVQYV2NkYGD4z8DAwMgAI0AMDA4AI3EBBMY7CTgAAAAASUVORK5CYII=) repeat;
}
</style>

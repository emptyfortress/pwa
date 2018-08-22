<template lang="pug" >
div
	div.all(v-if="$vuetify.breakpoint.lgAndUp")
		h1 {{currentFolder.text}}
		drag-zone.zone
			drag-content.content
				SlickList(lockAxis="y" v-model="items" useDragHandle)
					SlickItem(v-for="(item, index) in items" :index="index" :key="index" :item="item")
						v-card(:to="currentPath + '/' + item.id")
							h2 Item {{item.id}}
							div(v-handle).drag
			drag-handle.handle
			drag-content.content
				v-slide-y-transition(mode="out-in")
					router-view

	v-layout( column v-if="$vuetify.breakpoint.mdAndDown")
		v-card(flat v-for="item in items" :key="item.id" :to="'/m/' + item.id" )
			h2 Item {{item.id}}

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
		test () {
			console.log('laksjla')
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
		&:hover {
			border-left: 2px dotted #666;
			border-right: 2px dotted #666;
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
	h2 {
		font-weight: 400;
	}
}
.drag {
	width: 30px;
	height: 30px;
	background: red;
}
</style>

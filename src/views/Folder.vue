<template lang="pug" >
v-slide-x-transition(mode="out-in")
	div
		v-slide-x-reverse-transition(mode="out-in")
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
			<!-- Filter(:dialog="dialog") -->

</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import { ResponsiveDirective } from 'vue-responsive-components'
import Tiles from '@/components/Tiles'
import Split from '@/components/Split'
import DataTable from '@/components/DataTable'
// import Filter from '@/components/Filter'

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
			selectNew: false,
			dialog: true
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
		}
	},
	methods: {
		doNothing (evt) {
			evt.stopPropagation()
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
		DataTable,
		// Filter
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

.mobile.v-card {
	.card-content {
		margin: 1rem;
		width: 100%;
		.head {
			font-size: 1.27rem;
		}
	}
}

</style>

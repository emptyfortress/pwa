<template lang="pug">
table(ref="sortableTable" )
	tbody
		tr( v-for="user in items" ).sortableRow
			td.px-0.drag(@mousedown.native.stop)
				v-btn(icon class="sortHandle" @mousedown.native.stop)
					v-icon drag_handle
			td {{ user }}

</template>

<script>
import Sortable from 'sortablejs'

export default {
	props: [ 'items' ],
	data () {
		return {
		}
	},
	computed: {
	},
	mounted () {
		/* eslint-disable no-new */
		new Sortable(
			this.$refs.sortableTable.$el.getElementsByTagName('tbody')[0],
			{
				draggable: '.sortableRow',
				handle: '.sortHandle'
				// onStart: this.dragStart,
				// onEnd: this.dragReorder
			}
		)
	},
	methods: {
		dragStart ({item}) {
			const nextSib = item.nextSibling
			if (nextSib &&
				nextSib.classList.contains('datatable__expand-row')) {
				this.expandRow = nextSib
			} else {
				this.expandRow = null
			}
		},
		dragReorder ({item, oldIndex, newIndex}) {
			let newItems = this.items.sort(this.predicateBy(this.pagination.sortBy))
			if (this.pagination.descending === true) {
				newItems = newItems.reverse()
			}
			const nextSib = item.nextSibling
			if (nextSib &&
				nextSib.classList.contains('datatable__expand-row') &&
				nextSib !== this.expandRow) {
				item.parentNode.insertBefore(item, nextSib.nextSibling)
			}
			const movedItem = this.items.splice(oldIndex, 1)[0]
			this.items.splice(newIndex, 0, movedItem)
			this.$store.commit('setItems', newItems)
			this.pagination.sortBy = ''
		}
	}
}
</script>

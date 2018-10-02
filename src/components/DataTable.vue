<template lang="pug">
div
	.panel
	v-card(flat)
		v-card-title
			span Nutrition
			v-spacer
			v-text-field(v-model="search" append-icon="search" label="Search" single-line hide-details)
		v-data-table(v-bind:headers="headers" :search="search" :items="desserts" :pagination.sync="pagination" :item-key="name" ref="sortableTable" expand hide-actions)
			template(slot="headers" slot-scope="props")
				tr
					th
						v-checkbox(:input-value="props.all" :indeterminate="props.indeterminate" primary hide-details @click.native="toggleAll")
					th(v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)")
						span
							v-icon(small) arrow_upward
						span {{ header.text  }}
			template(slot="items" slot-scope="props")
				tr(class="sortableRow" :key="itemKey(props.item)" @click="props.expanded = !props.expanded").sortableRow
					td
						v-checkbox(:input-value="props.selected" primary hide-details)
					td(style="width: 0.1%")
						v-btn(style="cursor: move" icon).sortHandle
							v-icon drag_handle
					td {{ props.item.name  }}
					td {{ props.item.calories  }}
					td {{ props.item.fat  }}
					td {{ props.item.carbs  }}
					td {{ props.item.protein  }}
					td {{ props.item.iron  }}
			template(slot="expand" slot-scope="props")
				v-card(flat :key="itemKey(props.name) + '_expand'")
					v-card-text Peek-a-boo lakjsdlkj!
			v-alert(slot="no-results" :value="true" color="warning" icon="warning")
				span Сорян, не могу найти {{ search }}

</template>

<script>
import Sortable from 'sortablejs'

export default {
	data () {
		return {
			search: '',
			selected: [],
			expandRow: null,
			itemKeys: new WeakMap(),
			currentItemKey: 0,
			pagination: {
				sortBy: 'name'
			},
			headers: [
				{
					text: '',
					align: 'left',
					sortable: false
				},
				{
					text: 'Dessert (100g serving)',
					align: 'left',
					sortable: false,
					value: 'name'
				},
				{ text: 'Calories', value: 'calories' },
				{ text: 'Fat (g)', value: 'fat' },
				{ text: 'Carbs (g)', value: 'carbs' },
				{ text: 'Protein (g)', value: 'protein' },
				{ text: 'Iron (%)', value: 'iron' }
			],
			desserts: [
				{
					value: false,
					name: 'Frozen Yogurt',
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
					iron: '1%'
				},
				{
					value: false,
					name: 'Ice cream sandwich',
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					iron: '1%'
				},
				{
					value: false,
					name: 'Eclair',
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					iron: '7%'
				},
				{
					value: false,
					name: 'Cupcake',
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					iron: '8%'
				},
				{
					value: false,
					name: 'Gingerbread',
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9,
					iron: '16%'
				},
				{
					value: false,
					name: 'Jelly bean',
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0,
					iron: '0%'
				},
				{
					value: false,
					name: 'Lollipop',
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0,
					iron: '2%'
				},
				{
					value: false,
					name: 'Honeycomb',
					calories: 408,
					fat: 3.2,
					carbs: 87,
					protein: 6.5,
					iron: '45%'
				},
				{
					value: false,
					name: 'Donut',
					calories: 452,
					fat: 25.0,
					carbs: 51,
					protein: 4.9,
					iron: '22%'
				},
				{
					value: false,
					name: 'KitKat',
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7,
					iron: '6%'
				}
			]
		}
	},
	components: {
		// SlickItem,
		// SlickList
	},
	mounted () {
		/* eslint-disable no-new */
		new Sortable(
			this.$refs.sortableTable.$el.getElementsByTagName('tbody')[0],
			{
				// draggable: '.sortableRow',
				handle: '.sortHandle',
				onStart: this.dragStart,
				onEnd: this.dragReorder
			}
		)
	},
	methods: {
		toggleAll () {
			if (this.selected.length) this.selected = []
			else this.selected = this.desserts.slice()
		},
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
			console.log('reorder', item, oldIndex, newIndex)
			const nextSib = item.nextSibling
			if (nextSib &&
				nextSib.classList.contains('datatable__expand-row') &&
				nextSib !== this.expandRow) {
				item.parentNode.insertBefore(item, nextSib.nextSibling)
			}
			const movedItem = this.items.splice(oldIndex, 1)[0]
			this.items.splice(newIndex, 0, movedItem)
		},
		itemKey (item) {
			if (!this.itemKeys.has(item)) this.itemKeys.set(item, ++this.currentItemKey)
			return this.itemKeys.get(item)
		},
		changeSort (column) {
			if (this.pagination.sortBy === column) {
				this.pagination.descending = !this.pagination.descending
			} else {
				this.pagination.sortBy = column
				this.pagination.descending = false
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child) {
    /* border-bottom: 1px solid rgba(0,0,0,.12); */
    border-bottom: none;
}
.panel {
	padding: .5rem 0;
	height: 3.5rem;
}
</style>

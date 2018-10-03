<template lang="pug">
div
	.panel
	v-card(flat)
		v-card-title
			span Nutrition
			v-spacer
			v-text-field(v-model="search" append-icon="search" label="Search" single-line hide-details)
		<v-data-table v-bind:headers="headers" :items="items" hide-actions class="elevation-1" ref="sortableTable" item-key="name" expand >
			<template slot="items" slot-scope="props">
				<tr class="sortableRow" :key="itemKey(props.item)" @click="props.expanded = !props.expanded"> <!-- NOTE:  You'll need a unique ID, that is specific to the given item, for the key.   Not providing a unique key that's bound to the item object will break drag and drop sorting.  The itemKey method will return a uid for a given object using WeakMap.  You could just use a property in the object with a unique value, like "props.item.name" in this case, but often getting a unique value from the object's properties can be difficult, like when adding new rows, or when the unique field is open to editing, etc. -->
					<td class="px-1" style="width: 0.1%">
						<v-btn style="cursor: move" icon class="sortHandle"><v-icon>drag_handle</v-icon></v-btn>
					</td>
					<td>{{ props.item.name  }}</td>
					<td class="text-xs-right">{{ props.item.calories  }}</td>
					<td class="text-xs-right">{{ props.item.fat  }}</td>
					<td class="text-xs-right">{{ props.item.carbs  }}</td>
					<td class="text-xs-right">{{ props.item.protein  }}</td>
					<td class="text-xs-right">{{ props.item.sodium  }}</td>
					<td class="text-xs-right">{{ props.item.calcium  }}</td>
					<td class="text-xs-right">{{ props.item.iron  }}</td>
				</tr>
			</template>

			<template slot="expand" slot-scope="props" >
				<v-card flat :key="itemKey(props.item) + '_expand'"> something nested here {{ props.item.name  }} </v-card>
			</template>

		</v-data-table>
</template>

<script>
import Sortable from 'sortablejs'

export default {
	data () {
		return {
			expandRow: null,
			itemKeys: new WeakMap(),
			currentItemKey: 0,
			headers: [
				{
					sortable: false
				},
				{
					text: 'Dessert (100g serving)',
					align: 'left',
					sortable: true,
					value: 'name'
				},
				{ text: 'Calories', value: 'calories', sortable: false },
				{ text: 'Fat (g)', value: 'fat', sortable: false },
				{ text: 'Carbs (g)', value: 'carbs', sortable: false },
				{ text: 'Protein (g)', value: 'protein', sortable: false },
				{ text: 'Sodium (mg)', value: 'sodium', sortable: false },
				{ text: 'Calcium (%)', value: 'calcium', sortable: false },
				{ text: 'Iron (%)', value: 'iron', sortable: false }
			],
			items: [
				{
					value: false,
					name: 'Frozen Yogurt',
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
					sodium: 87,
					calcium: '14%',
					iron: '1%'
				},
				{
					value: false,
					name: 'Ice cream sandwich',
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					sodium: 129,
					calcium: '8%',
					iron: '1%'
				},
				{
					value: false,
					name: 'Eclair',
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					sodium: 337,
					calcium: '6%',
					iron: '7%'
				},
				{
					value: false,
					name: 'Cupcake',
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					sodium: 413,
					calcium: '3%',
					iron: '8%'
				},
				{
					value: false,
					name: 'Gingerbread',
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9,
					sodium: 327,
					calcium: '7%',
					iron: '16%'
				},
				{
					value: false,
					name: 'Jelly bean',
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0,
					sodium: 50,
					calcium: '0%',
					iron: '0%'
				},
				{
					value: false,
					name: 'Lollipop',
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0,
					sodium: 38,
					calcium: '0%',
					iron: '2%'
				},
				{
					value: false,
					name: 'Honeycomb',
					calories: 408,
					fat: 3.2,
					carbs: 87,
					protein: 6.5,
					sodium: 562,
					calcium: '0%',
					iron: '45%'
				},
				{
					value: false,
					name: 'Donut',
					calories: 452,
					fat: 25.0,
					carbs: 51,
					protein: 4.9,
					sodium: 326,
					calcium: '2%',
					iron: '22%'
				},
				{
					value: false,
					name: 'KitKat',
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7,
					sodium: 54,
					calcium: '12%',
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
				draggable: '.sortableRow',
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

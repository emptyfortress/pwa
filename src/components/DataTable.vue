<template lang="pug">
div
	.panel
	v-card(flat)
		v-card-title
			span Nutrition
			v-spacer
			v-text-field(v-model="search" append-icon="search" label="Search" single-line hide-details)
		v-data-table(:headers="headers" :items="desserts" :search="search" v-model="selected" item-key="name" select-all).mytable
			template(slot="items" slot-scope="props")
				tr(@click="props.expanded = !props.expanded")
					td
						v-checkbox(v-model="props.selected" primary hide-details)
					td {{ props.item.name }}
					td.text-xs-right {{ props.item.calories }}
					td.text-xs-right {{ props.item.fat }}
					td.text-xs-right {{ props.item.carbs }}
					td.text-xs-right {{ props.item.protein }}
					td.text-xs-right {{ props.item.iron }}
			template(slot="expand" slot-scope="props")
				v-card(flat)
					v-card-text Peek-a-boo lakjsdlkj!
			v-alert(slot="no-results" :value="true" color="warning" icon="warning")
				span Сорян, не могу найти {{ search }}
				<!-- img(:src="require('@/assets/img/man.svg')") -->
				<!-- Your search сорян for "{{ search }}" found no results. -->
</template>

<script>
export default {
	data () {
		return {
			search: '',
			headers: [
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

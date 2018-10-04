<template lang="pug">
div
	.panel
		v-layout(row wrap)
			v-spacer
			v-flex(xs2)
				v-text-field(v-model="search" label="Фильтр" hide-details).filter
	v-card(flat)
		<!-- v&#45;card&#45;title -->
		<!-- 	span Nutrition -->
		<!-- 	v&#45;spacer -->
		<!-- 	v&#45;text&#45;field(v&#45;model="search" append&#45;icon="search" label="Search" single&#45;line hide&#45;details) -->
		v-data-table(:headers="headers" :items="items" :search="search" disable-initial-sort :loading="false" ref="sortableTable" item-key="title" expand :rows-per-page-text="row" :rows-per-page-items="rowsPerPageItems").mytable
			v-progress-linear(slot="progress" color="blue" indeterminate)
			template(slot="items" slot-scope="props")
				<!-- You'll need a unique ID, that is specific to the given item, for the key. -->
				<!-- 	Not providing a unique key that's bound to the item object will break drag and drop sorting. -->
				<!-- 	The itemKey method will return a uid for a given object using WeakMap. -->
				<!-- 	You could just use a property in the object with a unique value, like "props.item.name" in this case, -->
				<!-- 	but often getting a unique value from the object's properties can be difficult, like when adding new rows, -->
				<!-- 	or when the unique field is open to editing, etc. -->
				tr(class="sortableRow" :key="itemKey(props.item)" @click="props.expanded = !props.expanded")
					td(class="px-1").drag
						v-btn(icon class="sortHandle")
							v-icon drag_handle
					td {{ props.item.title  }}
					td.nowrap {{ props.item.author  }}
					td {{ props.item.executor  }}
					td.nowrap {{ props.item.deadline  }}
					td.nowrap {{ props.item.created  }}
					td.nowrap {{ props.item.modified  }}
					td {{ props.item.files  }}

			template(slot="expand" slot-scope="props")
				v-card(flat :key="itemKey(props.item) + '_expand'") something nested here {{ props.item.title  }}
			template(slot="no-results")
				v-alert(:value="true" color="warning" icon="warning")
					span Сорян, ничего подходящего не нашел :(
			template(slot="no-data")
				v-alert(:value="true" color="error" icon="warning")
					p Sorry, nothing to display here :(
</template>

<script>
import Sortable from 'sortablejs'

export default {
	data () {
		return {
			expandRow: null,
			row: 'Строк на странице',
			rowsPerPageItems: [10, 25, 50, {'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1}],
			search: '',
			itemKeys: new WeakMap(),
			currentItemKey: 0,
			headers: [
				{ 'id': 0, 'text': '', 'align': 'left', 'sortable': false, 'value': '' },
				{ 'id': 1, 'text': 'Название', 'align': 'left', 'sortable': false, 'value': 'title' },
				{ 'id': 2, 'text': 'Автор', 'align': 'left', 'sortable': true, 'value': 'author' },
				{ 'id': 3, 'text': 'Исполн.', 'align': 'left', 'sortable': true, 'value': 'executor' },
				{ 'id': 4, 'text': 'Срок', 'align': 'left', 'sortable': true, 'value': 'deadline' },
				{ 'id': 5, 'text': 'Создано', 'align': 'left', 'sortable': true, 'value': 'created' },
				{ 'id': 6, 'text': 'Изменено', 'align': 'left', 'sortable': true, 'value': 'modified' },
				{ 'id': 7, 'text': 'Вложения', 'align': 'left', 'sortable': true, 'value': 'files' }
				// { 'id': 8, 'text': 'Описание', 'align': 'left', 'sortable': false, 'value': 'descr' }
			]
		}
	},
	computed: {
		items () {
			return this.$store.getters.items
		}
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
	padding: .0 1rem;
	/* height: 3.5rem; */
}
.sortHandle {
	color: #333;
	cursor: move;
}

.filter {
	margin-bottom: .5rem;
	padding-bottom: 0;
}
.nowrap {
	white-space: nowrap;
}

.narrow {
	width: 20px;
	border: 1px solid red;
}

.px-1 {
	/* border: 1px solid red; */
	.v-btn {
		margin: 0;
	}
}
.drag {
	background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAIUlEQVQYV2Ns2vj/f50/IyMDAwMDmPj///9/RhAAcWAAAN0pCAS0Z2yqAAAAAElFTkSuQmCC) repeat;
	/* background-color: $info; */
	height: 100%;
	padding: 0 2px;
	margin: 0;
}

</style>

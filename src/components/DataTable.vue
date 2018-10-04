<template lang="pug">
div
	.panel
		v-layout(row wrap)
			v-spacer
			v-flex(xs2)
				v-text-field(v-model="search" label="Фильтр" hide-details).filter
	v-card(flat)
		v-data-table(:headers="headers" :items="items" :search="search" :pagination.sync="pagination" :loading="false" ref="sortableTable" item-key="title" expand :rows-per-page-text="row" :rows-per-page-items="rowsPerPageItems").mytable
			v-progress-linear(slot="progress" color="blue" indeterminate)
			template(slot="items" slot-scope="props")
				<!-- You'll need a unique ID, that is specific to the given item, for the key. -->
				<!-- 	Not providing a unique key that's bound to the item object will break drag and drop sorting. -->
				<!-- 	The itemKey method will return a uid for a given object using WeakMap. -->
				<!-- 	You could just use a property in the object with a unique value, like "props.item.name" in this case, -->
				<!-- 	but often getting a unique value from the object's properties can be difficult, like when adding new rows, -->
				<!-- 	or when the unique field is open to editing, etc. -->
				<!-- tr(:key="itemKey(props.item)" @click="props.expanded = !props.expanded" :class="props.expanded ? 'wide' : ''").sortableRow -->
				tr(:key="itemKey(props.item)" :class="setClass(props)").sortableRow
					td(class="px-1" @click="props.item.unread = !props.item.unread").drag
						v-btn(icon class="sortHandle")
							v-icon drag_handle
					td(@click="expand(props)" ) {{ props.item.title  }}
					td
						.open
							i.icon-new-window
					td(@click="expand(props)" ).nowrap {{ props.item.author  }}
					td(@click="expand(props)" ) {{ props.item.executor  }}
					td(@click="expand(props)" ).nowrap {{ props.item.deadline  }}
					td(@click="expand(props)" ).nowrap {{ props.item.created  }}
					td(@click="expand(props)" ).nowrap {{ props.item.modified  }}
					td(@click="expand(props)" ) {{ props.item.files  }}

			template(slot="expand" slot-scope="props")
				v-card(flat :key="itemKey(props.item) + '_expand'").expand something nested here {{ props.item.title  }}
			template(slot="no-results")
				v-alert(:value="true" color="warning" icon="warning")
					span Сорян, ничего подходящего не нашел :(
			template(slot="no-data")
				v-alert(:value="true" color="warning" icon="warning")
					span Sorry, nothing to display here :(
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
			pagination: { sortBy: '' },
			headers: [
				{ 'id': 0, 'text': null, 'align': 'left', 'sortable': false, 'value': 'drag' },
				{ 'id': 1, 'text': 'Название', 'align': 'left', 'sortable': false, 'value': 'title' },
				{ 'id': 8, 'text': null, 'align': 'left', 'sortable': false, 'value': 'open' },
				{ 'id': 2, 'text': 'Автор', 'align': 'left', 'sortable': true, 'value': 'author' },
				{ 'id': 3, 'text': 'Исполн.', 'align': 'left', 'sortable': true, 'value': 'executor' },
				{ 'id': 4, 'text': 'Срок', 'align': 'left', 'sortable': true, 'value': 'deadline' },
				{ 'id': 5, 'text': 'Создано', 'align': 'left', 'sortable': true, 'value': 'created' },
				{ 'id': 6, 'text': 'Изменено', 'align': 'left', 'sortable': true, 'value': 'modified' },
				{ 'id': 7, 'text': 'Вложения', 'align': 'left', 'sortable': true, 'value': 'files' }
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
		},
		predicateBy (prop) {
			return function (a, b) {
				if (a[prop] > b[prop]) {
					return 1
				} else if (a[prop] < b[prop]) {
					return -1
				}
				return 0
			}
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
		},
		setClass (e) {
			if (e.expanded === true) {
				return 'wide'
			} else if (e.item.unread) {
				return 'unread'
			}
		},
		expand (e) {
			e.expanded = !e.expanded
			e.item.unread = false
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

/* this remove row border in table */
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
.expand {
	height: 300px;
}
tr.wide {
	background: $grey;
	td {
		border-top: 1px solid #ccc;
	}
}
.unread {
	td {
		font-weight: bold;
		color: $secondary;
		&.drag {
			background-color: $accent;
		}
	}

}

</style>

<template lang="pug">
div
	.panel
			v-layout(row)
				v-slide-x-transition(mode="out-in")
					div.selectionPanel(v-if="selectMode")
						v-btn(flat @click="closeSelection").mx-0.mt-2.close
							i.icon-close
								span {{sel.length}}
						.actionBt
							v-btn(color="info") В работу
							v-btn(color="accent") Делегировать
							<!-- v&#45;btn(color="success") Согласовать -->
					div(v-if="allRead && !selectMode")
						v-btn(flat @click="clearUnread" color="info") Сбросить новые
				v-spacer
				v-flex(xs2)
					v-text-field(v-model="search" label="Фильтр" hide-details).filter

	v-card(flat).mt-2.rel
		.set( @click="dialog = true" )
			i.icon-settings
		v-data-table(v-model="selected" select-all :headers="headers" :items="items" :search="search" :pagination.sync="pagination" :loading="false" ref="sortableTable" item-key="title" expand :rows-per-page-text="row" :rows-per-page-items="rowsPerPageItems").mytable
			template(slot="headers" slot-scope="props")
				tr
					th(v-if="selectMode").px-0.pl-2
						v-checkbox(:input-value="props.all" :indeterminate="props.indeterminate" primary hide-details @click.stop="toggleAll")
					th(v-for="header in props.headers" v-if="header.active" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)")
						span {{ header.text }}
						v-icon( small v-if="header.sortable") arrow_upward
			v-progress-linear(slot="progress" color="blue" indeterminate)
			template(slot="items" slot-scope="props")
				tr(:key="itemKey(props.item)" :class="setClass(props)").sortableRow
					td(v-if="selectMode").px-0.pl-2
						v-checkbox(:input-value="props.selected" primary hide-details @click.stop="props.selected = !props.selected")
					td(@click="props.item.unread = !props.item.unread").px-0.drag
						v-btn(icon class="sortHandle")
							v-icon drag_handle
					td(v-for="header in headers" :key="header.value" v-if="header.text !== null && header.active" @click="clickRow(props, $event)" :class="header.class" )
						span {{ props.item[header.value] }}
					td
						i.icon-new-window
			template(slot="expand" slot-scope="props")
				v-card(flat :key="itemKey(props.item) + '_expand'").expand
					ExpandItem(:props="props")
			template(slot="no-results")
				v-alert(:value="true" color="warning" icon="warning")
					span Сорян, ничего подходящего не нашел :(
			template(slot="no-data")
				v-alert(:value="true" color="warning" icon="warning")
					span Sorry, nothing to display here :(
	v-dialog(v-model="dialog" width="350")
		v-card
			v-card-title(class="headline grey lighten-2" primary-title) Настроить колонки
			SlickList( :value="headers" :distance=2 @input="newColumn" helperClass="moving" )
				v-list.ml-4
					SlickItem(v-for="(item, index) in headers" :index="index" :key="item.id" :item="item" v-if="item.text !== null")
						v-checkbox(v-model="item.active" :label="item.text")
			v-divider
			v-card-actions
				v-spacer
				v-btn(color="primary" flat @click="dialog = false") Отмена
				v-btn(color="primary" flat @click="dialog = false") Сохранить

	v-snackbar(v-model="snackbar" :timeout=0 multi-line ).snackbar
		.packet(v-ripple)
			i.icon-packet
			span Потоковая обработка
		v-btn(flat icon  @click="snackbar = false")
			i.icon-close
</template>

<script>
import Sortable from 'sortablejs'
import ExpandItem from '@/components/ExpandItem'
import { SlickList, SlickItem } from 'vue-slicksort'

export default {
	data () {
		return {
			expandRow: null,
			row: 'Строк на странице',
			rowsPerPageItems: [10, 25, 50, { 'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1 }],
			search: '',
			selected: [],
			snackbar: false,
			dialog: false,
			columnSetup: false,
			selectMode: false,
			itemKeys: new WeakMap(),
			currentItemKey: 0,
			pagination: { sortBy: '' },
			headers: [
				{ 'id': 0, 'active': true, 'class': 'px-0', 'text': null, 'align': 'left', 'sortable': true, 'value': 'unread' },
				{ 'id': 1, 'active': true, 'class': 'px-0', 'text': 'Название', 'align': 'left', 'sortable': true, 'value': 'title' },
				{ 'id': 2, 'active': true, 'class': 'nowrap', 'text': 'Автор', 'align': 'left', 'sortable': true, 'value': 'author' },
				{ 'id': 3, 'active': true, 'class': 'nowrap', 'text': 'Исп.', 'align': 'left', 'sortable': true, 'value': 'executor' },
				{ 'id': 4, 'active': true, 'class': 'nowrap', 'text': 'Срок', 'align': 'left', 'sortable': true, 'value': 'deadline' },
				{ 'id': 5, 'active': true, 'class': 'nowrap', 'text': 'Создано', 'align': 'left', 'sortable': true, 'value': 'created' },
				{ 'id': 6, 'active': true, 'class': 'nowrap', 'text': 'Изменено', 'align': 'left', 'sortable': true, 'value': 'modified' },
				{ 'id': 7, 'active': true, 'class': 'text-xs-center', 'text': 'Файлы', 'align': 'left', 'sortable': true, 'value': 'files' },
				{ 'id': 8, 'active': false, 'class': '', 'text': null, 'value': '', sortable: false }
			]
		}
	},
	computed: {
		items () {
			return this.$store.getters.items
		},
		allRead () {
			let items = this.$store.getters.items
			let unreadItems = items.filter(item => item.unread)
			if (unreadItems.length === 0) {
				return false
			} else return true
		},
		sel () {
			return [...new Set(this.selected)]
		}
	},
	watch: {
		selected (length) {
			if (length) {
				this.snackbar = 1
			}
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
	components: {
		ExpandItem,
		SlickList,
		SlickItem
	},
	methods: {
		newColumn (e) {
			this.headers = e
		},
		clearUnread () {
			let items = this.$store.getters.items
			items.map(function (item) {
				item.unread = 0
			})
		},
		toggleAll () {
			if (this.selected.length) this.selected = []
			else this.selected = this.items.slice()
			this.snackbar = !this.snackbar
		},
		dragStart ({ item }) {
			const nextSib = item.nextSibling
			if (nextSib &&
				nextSib.classList.contains('datatable__expand-row')) {
				this.expandRow = nextSib
			} else {
				this.expandRow = null
			}
		},
		dragReorder ({ item, oldIndex, newIndex }) {
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
		clickRow (e, i) {
			if (i.shiftKey && !this.selectMode) {
				this.selectMode = true
				e.selected = true
			} else if (i.shiftKey && this.selectMode) {
				this.closeSelection()
			} else {
				e.expanded = !e.expanded
				e.item.unread = false
			}
		},
		closeSelection () {
			// this.selected = []
			this.selectMode = false
			this.snackbar = false
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
	height: 3.5rem;
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
	border-left: 8px solid transparent;
}
.expand {
	height: 300px;
	padding: 1rem;
	overflow-y: hidden;
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
		color: darken($accent, 30%);
		.v-btn .v-btn__content .v-icon { color: darken($accent, 30%); }
		&.drag {
			border-left: 8px solid darken($accent, 30%);
		}
	}
}

.selectionPanel {
	display: flex;
	div {
		.left { margin-left: 1.5rem; margin-right: 2rem; }
	}
}
.icon-prev { font-style: normal; }

.mytable th {
	text-align: left;
	padding-left: 0;
}

.rel {
	position: relative;
	.set {
		position: absolute;
		top: 1.2rem;
		right: 2.1rem;
		cursor: pointer;
	}
}

.moving {
	z-index: 1000;
	display: block;
	font-family: Roboto;
	line-height: 150%;
}
.sortableRow {
	user-select: none;
}
.close { min-width: 10px; }
.packet {
	cursor: pointer;
	padding: 5px 15px;
	font-size: 1.2rem;
	i {
		font-size: 1.4rem;
		margin-right: 1rem;
	}
}
.actionBt {
	margin-left: 5rem;
}
.icon-close {
	font-size: 1.3rem;
	font-style: normal;
	span {
		margin-left: .5rem;
		font-size: 1.6rem;
	}
}

</style>

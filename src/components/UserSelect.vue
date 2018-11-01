<template lang="pug">
div.rel
	v-autocomplete(
			:items="pers"
			:search-input.sync="search"
			:label="label"
			item-text="name"
			item-value="name"
			background-color="transparent" cache-items
			v-model="selected"
			@change="onChange"
			class="mx-3" flat hide-no-data hide-details multiple chips
			)
		template(slot="selection" slot-scope="data")
			v-chip(:selected="data.selected" close class="chip--select-multi" @input="remove(data.item)")
				v-avatar
					img(:src="data.item.img").dark
				span {{ data.item.name }}
		template( slot="item" slot-scope="data")
			v-list-tile-avatar
				img(:src="data.item.img").av
			v-list-tile-content
				v-list-tile-title {{ data.item.name }}
				v-list-tile-sub-title(v-if="state === 'name'").small отдел, департамент
	<!-- .list(v&#45;if="tree") -->
	<!-- 	.pop -->
	<!-- 		tree(:data="deps" :options="treeOptions") -->
</template>

<script>
export default {
	props: ['label', 'value'],
	data () {
		let src = {
			1: '/img/user0.svg',
			2: '/img/user1.svg',
			3: '/img/role.svg'
		}
		return {
			search: null,
			state: 'name',
			// tree: false,
			// role: false,
			items: [],
			selected: this.value,
			roles: [
				{img: src[3], name: '=Автор'},
				{img: src[3], name: '=Инициатор'},
				{img: src[3], name: '=Исполнитель'},
				{img: src[3], name: '=Согласующий'},
				{img: src[3], name: '=Контролер'},
				{img: src[3], name: '=Регистратор'},
				{img: src[3], name: '=Все руководители'}
			],
			deps: [
				{id: 0,
					text: 'Руководство',
					'image': '',
					children: [
						{id: 10, text: 'Производство', 'image': ''},
						{id: 11, text: 'Производство', 'image': ''},
						{id: 12, text: 'Производство', 'image': ''}
					]
				},
				{id: 1, text: 'Производство', 'image': ''},
				{id: 2, text: 'Логистика', 'image': ''},
				{id: 3, text: 'Сервис', 'image': ''},
				{id: 4, text: 'НИО', 'image': ''},
				{id: 5, text: 'Отдел внедрений', 'image': ''},
				{id: 6, text: 'Отдел АСУ', 'image': ''},
				{id: 7, text: 'Корпоративные продажи', 'image': ''}
			]
		}
	},
	watch: {
		search (val) {
			if (val === '\\') {
				this.state = 'tree'
			}
			if (val === '=') {
				this.state = 'role'
			}
		}
	},
	computed: {
		persons () {
			return this.$store.getters.users
		},
		pers () {
			if (this.state === 'name') {
				return this.persons
			}
			if (this.state === 'role') {
				return this.roles
			}
			// else return this.persons
		}
	},
	methods: {
		onChange () {
			this.$emit('input', this.selected)
		},

		remove (item) {
			const index = this.selected.indexOf(item.name)
			if (index >= 0) this.selected.splice(index, 1)
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.v-autocomplete {
	border-bottom: 1px solid #333;
}

.application .theme--light.v-list .v-list__tile__mask, .theme--light .v-list .v-list__tile__mask {
	color: #fff;
	background: #333;
}

.rel { position: relative; }
.av {
	background: $grey;
}
.dark {
	background: #fff;
	background: -moz-linear-gradient(top, #05abe0 0%, #53cbf1 60%, #87e0fd 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top, #05abe0 0%,#53cbf1 60%,#87e0fd 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom, #05abe0 0%,#53cbf1 60%,#87e0fd 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#05abe0', endColorstr='#87e0fd',GradientType=0 ); /* IE6-9 */
}
.chip--select-multi {
	background: #d1e3f7;
	border: 1px solid #99bee8;
}
.small {
	font-size: .8rem;
	color: $grey2;
	font-style: italic;
}

.list {
	z-index: 2;
	position: absolute;
	top: 35px;
	left: 0;
	width: 100%;
	padding: .5rem 0;
	.pop {
		z-index: 35;
		background: #fff;
		margin: 0 1rem;
		box-shadow: 0 5px 10px #00000033;
		height: 250px;
		overflow: auto;
		.v-list {
			cursor: pointer;
			div:hover {
				background: #eee;
			}
		}
	}
}
</style>

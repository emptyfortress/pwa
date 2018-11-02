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
			v-chip(:selected="data.selected" close :class="data.item.class ? data.item.class : 'chip--select-multi'" @input="remove(data.item)")
				v-avatar
					img(:src="data.item.img").dark
				span {{ data.item.name }}
		template( slot="item" slot-scope="data")
			v-list-tile-avatar
				img(:src="data.item.img").av
			v-list-tile-content
				v-list-tile-title {{ data.item.name }}
				v-list-tile-sub-title(v-if="state === 'name'").small отдел, департамент
	.list(v-if="state === 'tree'")
		.pop
			tree(:data="deps" :filter="filter")
				span(slot-scope="{ node }")
					template(v-if="!node.data.icon")
						span {{ node.text }}
					template(v-else)
						v-layout(row align-center @click="addSelection(node)").foo
							v-avatar(size="32")
								img(src="/img/user0.svg").av
							v-flex
								.name {{ node.text }}
								.descr должность
					</template>
				</span>
</template>

<script>
export default {
	props: ['label', 'value'],
	data () {
		let src = {
			1: '/img/user0.svg',
			2: '/img/user1.svg',
			3: '/img/role.svg',
			4: '/img/user2.svg'
		}
		return {
			search: null,
			filter: '',
			state: 'name',
			items: [],
			selected: this.value,
			roles: [
				{class: 'role', img: src[3], name: '=Автор'},
				{class: 'role', img: src[3], name: '=Инициатор'},
				{class: 'role', img: src[3], name: '=Исполнитель'},
				{class: 'role', img: src[3], name: '=Согласующий'},
				{class: 'role', img: src[3], name: '=Контролер'},
				{class: 'role', img: src[3], name: '=Регистратор'},
				{class: 'role', img: src[3], name: '=Все руководители'}
			],
			words: [
				{class: 'word', img: src[4], name: '+Я'},
				{class: 'word', img: src[4], name: '+Мои заместители'},
				{class: 'word', img: src[4], name: '+Мои коллеги'},
				{class: 'word', img: src[4], name: '+Мой отдел'},
				{class: 'word', img: src[4], name: '+Мои подчиненные'}
			]
		}
	},
	watch: {
		search (val) {
			if (val.length > 0 && val[0] === '\\') {
				this.state = 'tree'
				this.filter = val.slice(1)
			}
			if (val.length > 0 && val[0] === '=') {
				this.state = 'role'
			}
			if (val.length > 0 && val[0] === '+') {
				this.state = 'word'
			}
		}
	},
	computed: {
		deps () {
			return this.$store.getters.departments
		},
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
			if (this.state === 'word') {
				return this.words
			}
		}
	},
	methods: {
		addSelection (e) {
			this.selected.push('Блохин')
			this.state = 'name'
		},
		onChange () {
			this.$emit('input', this.selected)
			console.log(this.selected)
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
.my {
	background: #b50000;
	color: #fff;
}
.role {
	background: #fff4a2;
	border: 1px solid #e8c599;
	.dark {
		background: #efc735;
	}
}
.word {
	background: #ffc1ff;
	border: 1px solid #ff9cff;
	.dark {
		background: #ffc1ff;
	}
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
.foo {
	margin-left: -30px;
	padding: 0;
	.v-avatar { margin-right: .5rem; }
	.name { line-height: 100%; }
	.descr {
		font-size: .9rem;
		font-style: italic;
		color: $grey2;
		margin-top: 0;
	}
}

</style>

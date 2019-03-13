<template lang="pug">
.cont
	h2 {{ this.currentItem.title }}
	.att1.mt-2
		v-list-tile.mx-0
			v-list-tile-avatar
				img(:src="require('@/assets/img/user0.svg')").av
			v-list-tile-content
				v-list-tile-sub-title автор
				v-list-tile-title {{ currentItem.executor }}
		v-list-tile
			v-list-tile-avatar
				img(:src="require('@/assets/img/user0.svg')").av
			v-list-tile-content
				v-list-tile-sub-title контролер
				v-list-tile-title Петров А.П.
		v-list-tile
			v-list-tile-avatar
				i.icon-deadline.deadline
			v-list-tile-content
				v-list-tile-sub-title срок
				v-list-tile-title {{ currentItem.deadline }}

</template>

<script>
export default {
	props: ['id', 'items'],
	data () {
		return {
		}
	},
	computed: {
		currentItem () {
			return this.items[this.id]
		}
	},
	methods: {
	}
}
</script>

<style lang="scss">
.cont {
}
.av { background: #fff; }
.deadline {
	font-size: 2rem;
}
h2 {
	font-size: 2rem;
	font-weight: 400;
	line-height: 120%;
}
.v-list__tile__sub-title {
	font-size: .9rem;
	color: #888;
}
.att1 {
	display: flex;
	flex-wrap: wrap;
}
</style>

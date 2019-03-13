<template lang="pug">
.cont
	h2 {{ this.currentItem.title }}
	.att1
		v-list-tile
			v-list-tile-avatar
				img(:src="require('@/assets/img/user0.svg')").av
			v-list-tile-content
				v-list-tile-title Blaksj
				v-list-tile-sub-title 20 авг 13:10
		v-list-tile
			v-list-tile-avatar
				img(:src="require('@/assets/img/user0.svg')").av
			v-list-tile-content
				v-list-tile-title Blaksj
				v-list-tile-sub-title 20 авг 13:10
		v-list-tile
			v-list-tile-avatar
				img(:src="require('@/assets/img/user0.svg')").av
			v-list-tile-content
				v-list-tile-title Blaksj
				v-list-tile-sub-title 20 авг 13:10

</template>

<script>
export default {
	props: ['onboarding', 'selItems'],
	data () {
		return {
		}
	},
	computed: {
		currentItem () {
			return this.selItems[this.onboarding]
		}
	},
	methods: {
	}
}
</script>

<style lang="scss">
.cont {
	/* background: red; */
}
h2 {
	font-size: 2rem;
	font-weight: 400;
	line-height: 120%;
}
.v-list__tile__sub-title {
	font-size: .9rem;
	color: aaa;
}
.att1 {
	display: flex;
	flex-wrap: wrap;
}
</style>

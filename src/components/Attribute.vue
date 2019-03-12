<template lang="pug">
.cont
	h2 {{ this.currentItem.title }}
</template>

<script>
export default {
	props: ['id', 'selItems'],
	data () {
		return {

		}
	},
	computed: {
		currentItem () {
			return this.selItems[this.id]
		}
	},
	methods: {
	}
}
</script>

<style lang="scss">
.cont {
}
h2 {
	font-size: 1.6rem;
	font-weight: 400;
}
</style>

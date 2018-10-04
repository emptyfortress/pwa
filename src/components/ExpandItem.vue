<template lang="pug">
div
	h2 {{ props.item.title }}
</template>

<script>
export default {
	props: ['props'],
	data () {
		return {

		}
	},
	computed: {
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

h2 {
	font-weight: 400;
	text-transform: uppercase;
}
</style>

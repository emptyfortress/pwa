<template lang="pug">
v-layout(row wrap)
	v-flex(grow)
		h2 {{ props.item.title }}
	v-flex(xs4)
		img(:src="require('@/assets/img/docs/img' + props.item.id + '.jpg')").preview
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
.v-layout {
	overflow: hidden;
}
.preview {
	width: 100%;
	box-shadow: 0 0 5px #000000aa;
}
</style>

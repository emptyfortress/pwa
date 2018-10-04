<template lang="pug">
div
	v-layout(row wrap)
		v-flex(xs8)
			h2 {{ props.item.title }}
			v-avatar(size=64)
				img(:src="require('@/assets/img/user0.svg')").av
			.descr {{ props.item.descr }}
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
	margin-bottom: 1rem;
}
.preview {
	width: 100%;
	box-shadow: 0 0 5px #000000aa;
}

.descr {
	font-size: 1.1rem;
	margin-right: 1rem;
}

.av {
	background: #eee;
}
</style>

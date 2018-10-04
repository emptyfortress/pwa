<template lang="pug">
div
	v-layout(row wrap)
		v-flex(xs8)
			.block
				v-avatar(size=64)
					img(:src="require('@/assets/img/user0.svg')" ondragstart="return false;")
				.head
					h2 {{ props.item.title }}
					div {{ props.item.author }}
			.descr {{ props.item.descr }}
		v-flex(xs4)
			img(:src="require('@/assets/img/docs/img' + props.item.id + '.jpg')" @click="front").preview
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
		front () {
			let elem = this.$parent.$el
			if (elem.style.overflow === '') {
				elem.style.overflow = 'visible'
			} else elem.style.overflow = ''
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/colors.scss';

.block {
	display: flex;
	align-content: center;
	.v-avatar {
		margin-right: 1rem;
		background: #eee;
		margin-bottom: 1rem;
	}
}

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
	font-size: 1rem;
	margin-right: 1rem;
}

</style>
